// AutoDyno AI - Vehicle State Manager
class VehicleManager {
    constructor() {
        this.currentVehicle = localStorage.getItem('selectedVehicle') || 'bmw-m3';
        this.installedParts = JSON.parse(localStorage.getItem('installedParts') || '[]');
        this.tuningProfile = JSON.parse(localStorage.getItem('tuningProfile') || '{}');
    }
    
    setVehicle(vehicleId) {
        this.currentVehicle = vehicleId;
        localStorage.setItem('selectedVehicle', vehicleId);
        this.updateUI();
    }
    
    installPart(partId) {
        if (!this.installedParts.includes(partId)) {
            this.installedParts.push(partId);
            localStorage.setItem('installedParts', JSON.stringify(this.installedParts));
            this.updateUI();
        }
    }
    
    removePart(partId) {
        this.installedParts = this.installedParts.filter(id => id !== partId);
        localStorage.setItem('installedParts', JSON.stringify(this.installedParts));
        this.updateUI();
    }
    
    hasPart(partId) {
        return this.installedParts.includes(partId);
    }
    
    getVehicle() {
        return window.aiEngine?.vehicleDatabase[this.currentVehicle] || null;
    }
    
    getInstalledParts() {
        return this.installedParts;
    }
    
    // Calculate current vehicle stats with installed parts
    getCurrentStats() {
        const vehicle = this.getVehicle();
        if (!vehicle) return null;
        
        let totalPowerGain = 0;
        let totalTorqueGain = 0;
        
        this.installedParts.forEach(partId => {
            const part = window.aiEngine?.partsDatabase.find(p => p.id === partId);
            if (part) {
                totalPowerGain += part.powerGain || 0;
                totalTorqueGain += part.torqueGain || 0;
            }
        });
        
        return {
            ...vehicle,
            currentPower: vehicle.basePower + totalPowerGain,
            currentTorque: vehicle.torque + totalTorqueGain,
            installedParts: this.installedParts
        };
    }
    
    saveTuningProfile(name, vehicleId, parts, notes) {
        this.tuningProfile[name] = {
            vehicleId,
            parts,
            notes,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('tuningProfile', JSON.stringify(this.tuningProfile));
    }
    
    resetVehicle() {
        this.installedParts = [];
        localStorage.removeItem('installedParts');
        this.updateUI();
    }
    
    updateUI() {
        // Update vehicle name displays
        const displays = document.querySelectorAll('#current-vehicle, #current-vehicle-name');
        const vehicle = this.getVehicle();
        if (vehicle) {
            displays.forEach(el => {
                if (el) el.textContent = `${vehicle.make} ${vehicle.model}`;
            });
        }
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('vehicleChanged', {
            detail: { vehicle: this.currentVehicle, parts: this.installedParts }
        }));
    }
}

window.vehicleManager = new VehicleManager();

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
    window.vehicleManager.updateUI();
});
