// AutoDyno AI - OBD-II Data Simulator
class OBDIISimulator {
    constructor() {
        this.data = {
            rpm: 0,
            speed: 0,
            coolantTemp: 90,
            intakeAirTemp: 35,
            throttlePosition: 0,
            fuelPressure: 300,
            engineLoad: 0,
            fuelLevel: 85,
            voltage: 12.6,
            massAirFlow: 2.5,
            timingAdvance: 10,
            oxygenVoltage: 0.45
        };
        
        this.isRunning = false;
        this.startTime = 0;
        this.maxRPM = 8000;
        this.horsepower = 0;
        this.torque = 0;
        
        this.callbacks = [];
    }

    // Simulate engine start and idle
    startEngine() {
        this.isRunning = true;
        this.startTime = Date.now();
        this.simulateIdle();
    }

    simulateIdle() {
        this.data.rpm = 800 + Math.random() * 100;
        this.data.speed = 0;
        this.data.coolantTemp = 85 + Math.random() * 5;
        this.data.throttlePosition = 5 + Math.random() * 2;
        this.data.engineLoad = 15 + Math.random() * 5;
        this.calculatePerformance();
        this.notifyCallbacks();
    }

    // Simulate acceleration
    accelerate(duration = 3000) {
        const startRPM = this.data.rpm;
        const targetRPM = this.maxRPM * 0.9;
        const steps = 60;
        const stepDuration = duration / steps;
        let step = 0;

        const accelerateInterval = setInterval(() => {
            step++;
            const progress = step / steps;
            const easing = this.easeInOutQuad(progress);
            
            this.data.rpm = startRPM + (targetRPM - startRPM) * easing;
            this.data.speed = (this.data.speed + (targetRPM - startRPM) * 0.15 * easing);
            this.data.throttlePosition = 20 + (80 * easing);
            this.data.engineLoad = 30 + (60 * easing);
            this.data.coolantTemp = 90 + (progress * 10);
            
            this.calculatePerformance();
            this.notifyCallbacks();

            if (step >= steps) {
                clearInterval(accelerateInterval);
                this.cruise();
            }
        }, stepDuration);
    }

    cruise() {
        const cruiseInterval = setInterval(() => {
            this.data.rpm = this.maxRPM * 0.7 + Math.sin(Date.now() / 1000) * 200;
            this.data.speed = 120 + Math.sin(Date.now() / 800) * 5;
            this.data.throttlePosition = 40 + Math.sin(Date.now() / 1000) * 5;
            this.data.engineLoad = 50 + Math.sin(Date.now() / 800) * 5;
            
            this.calculatePerformance();
            this.notifyCallbacks();
        }, 100);
        
        setTimeout(() => clearInterval(cruiseInterval), 5000);
    }

    // Calculate horsepower and torque based on RPM and load
    calculatePerformance() {
        const rpmFactor = this.data.rpm / this.maxRPM;
        const loadFactor = this.data.engineLoad / 100;
        
        // Simplified power calculation ( realistic curve )
        const peakPowerRPM = 5500;
        const peakTorqueRPM = 3500;
        
        // Torque curve
        const torqueMultiplier = Math.exp(-Math.pow((this.data.rpm - peakTorqueRPM) / 2000, 2));
        this.torque = 450 * torqueMultiplier * (0.8 + loadFactor * 0.4);
        
        // Power curve (shifted by RPM)
        const powerMultiplier = Math.exp(-Math.pow((this.data.rpm - peakPowerRPM) / 2500, 2));
        this.horsepower = 380 * powerMultiplier * (0.8 + loadFactor * 0.4);
        
        // Add small random variations
        this.torque += (Math.random() - 0.5) * 5;
        this.horsepower += (Math.random() - 0.5) * 3;
        
        // Ensure non-negative
        this.torque = Math.max(0, this.torque);
        this.horsepower = Math.max(0, this.horsepower);
    }

    // Easing function
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    // Get current data snapshot
    getData() {
        return { ...this.data };
    }

    // Get performance metrics
    getPerformance() {
        return {
            horsepower: this.horsepower.toFixed(1),
            torque: this.torque.toFixed(1),
            rpm: this.data.rpm
        };
    }

    // Subscribe to data updates
    subscribe(callback) {
        this.callbacks.push(callback);
        return () => {
            this.callbacks = this.callbacks.filter(cb => cb !== callback);
        };
    }

    // Notify all subscribers
    notifyCallbacks() {
        this.callbacks.forEach(cb => cb(this.getData()));
    }

    // Generate dyno run data
    generateDynoCurve(rpmRange = [1000, 8000]) {
        const points = 50;
        const step = (rpmRange[1] - rpmRange[0]) / points;
        const curve = [];
        
        for (let rpm = rpmRange[0]; rpm <= rpmRange[1]; rpm += step) {
            // Torque curve - bell shaped
            const torqueMultiplier = Math.exp(-Math.pow((rpm - 3500) / 2000, 2));
            const torque = 450 * torqueMultiplier;
            
            // Power curve - shifted
            const powerMultiplier = Math.exp(-Math.pow((rpm - 5500) / 2500, 2));
            const horsepower = 380 * powerMultiplier;
            
            curve.push({
                rpm: Math.round(rpm),
                torque: torque + (Math.random() - 0.5) * 10,
                horsepower: horsepower + (Math.random() - 0.5) * 5
            });
        }
        
        return curve;
    }

    // Simulate part installation effect
    simulatePartUpgrade(partType) {
        const effects = {
            'coldAirIntake': { torque: +25, horsepower: +15, throttleResponse: 0.9 },
            'performanceExhaust': { torque: +18, horsepower: +22, exhaustNote: 'aggressive' },
            'turbocharger': { torque: +80, horsepower: +100, boostPressure: 12 },
            'supercharger': { torque: +65, horsepower: +85, responseTime: 0.1 },
            'ecuRemap': { torque: +35, horsepower: +45, fuelEfficiency: -5 },
            'sportCam': { torque: +20, horsepower: +30, idleRoughness: 0.3 },
            'nitrous': { torque: +150, horsepower: +200, duration: 30 }
        };
        
        return effects[partType] || { torque: 0, horsepower: 0 };
    }
}

// Global simulator instance
window.obdSimulator = new OBDIISimulator();

// Auto-start engine simulation
setTimeout(() => {
    window.obdSimulator.startEngine();
}, 500);
