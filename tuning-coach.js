// AutoDyno AI - Tuning Coach (Real-time Driving Analysis)
class TuningCoach {
    constructor() {
        this.drivingData = [];
        this.maxDataPoints = 100;
        this.lastAdvice = '';
        this.adviceCooldown = 10000;
        this.lastAdviceTime = 0;
        this.isActive = true;
        
        // Start monitoring
        this.startMonitoring();
    }
    
    startMonitoring() {
        // Poll OBD data every 500ms
        setInterval(() => {
            if (window.obdSimulator && window.obdSimulator.getData) {
                const data = window.obdSimulator.getData();
                this.analyzeDrive(data);
            }
        }, 500);
    }
    
    analyzeDrive(obdData) {
        if (!this.isActive) return;
        
        this.drivingData.push({
            timestamp: Date.now(),
            rpm: obdData.rpm,
            speed: obdData.speed,
            throttle: obdData.throttlePosition,
            load: obdData.engineLoad,
            temp: obdData.coolantTemp
        });
        
        if (this.drivingData.length > this.maxDataPoints) {
            this.drivingData.shift();
        }
        
        // Generate advice periodically
        if (Date.now() - this.lastAdviceTime > this.adviceCooldown) {
            const advice = this.generateAdvice();
            if (advice && advice !== this.lastAdvice) {
                this.showAdvice(advice);
                this.lastAdvice = advice;
                this.lastAdviceTime = Date.now();
            }
        }
    }
    
    generateAdvice() {
        if (this.drivingData.length < 20) return null;
        
        const recent = this.drivingData.slice(-20);
        const avgRPM = this.average(recent, 'rpm');
        const avgThrottle = this.average(recent, 'throttle');
        const maxRPM = Math.max(...this.drivingData.slice(-50).map(d => d.rpm));
        const redline = 7200;
        
        // Rev matching advice
        if (avgRPM > 5500 && avgThrottle < 30) {
            return '🏁 Consider short-shifting at 5500 RPM for better fuel economy in traffic';
        }
        
        // Lugging engine warning
        if (avgRPM < 2000 && avgThrottle > 70) {
            return '⚠️ High load at low RPM. Downshift to reduce stress and prevent detonation.';
        }
        
        // Over-rev warning
        if (maxRPM > redline - 200) {
            return '⚡ Approaching redline! Shift up soon to protect engine.';
        }
        
        // Cold engine
        const currentTemp = this.drivingData[this.drivingData.length - 1].temp;
        if (currentTemp < 70 && avgRPM > 4000) {
            return '🌡️ Engine warming. Avoid high RPM until coolant reaches ~90°C.';
        }
        
        // Aggressive driving pattern
        const throttleChanges = this.analyzeThrottleChanges(recent);
        if (throttleChanges > 30) {
            return '💨 Aggressive throttle detected. Gradual inputs improve fuel economy by 15-20%.';
        }
        
        // Cruising efficiency
        if (avgThrottle > 20 && avgRPM > 3000 && avgRPM < 5000) {
            return '📊 Optimal power band. Engine operating efficiently for performance driving.';
        }
        
        return null;
    }
    
    showAdvice(advice) {
        const chatMessages = document.querySelector('.scrollable-chat');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message bot';
            messageDiv.innerHTML = `<strong>Coach:</strong> ${advice}`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        const adviceEl = document.getElementById('coach-advice');
        if (adviceEl) {
            const textEl = document.getElementById('coach-advice-text');
            if (textEl) textEl.textContent = advice;
            adviceEl.style.display = 'block';
            setTimeout(() => {
                adviceEl.style.display = 'none';
            }, 8000);
        }
        
        // Also send to AI chat
        this.addToChat(advice);
    }
    
    addToChat(advice) {
        // Optional: add to chat history
    }
    
    average(array, key) {
        return array.reduce((sum, item) => sum + (item[key] || 0), 0) / array.length;
    }
    
    analyzeThrottleChanges(data) {
        let changes = 0;
        for (let i = 1; i < data.length; i++) {
            if (Math.abs(data[i].throttle - data[i-1].throttle) > 15) {
                changes++;
            }
        }
        return changes;
    }
    
    assessDrivingStyle() {
        const aggressive = this.drivingData.filter(d => d.throttle > 80 || d.rpm > 6000).length;
        const total = this.drivingData.length;
        const score = (aggressive / total) * 100;
        
        let style = 'Conservative';
        if (score > 60) style = 'Aggressive';
        else if (score > 30) style = 'Moderate';
        
        return {
            style,
            aggressivePercentage: score.toFixed(1),
            avgRPM: this.average(this.drivingData, 'rpm'),
            topSpeed: Math.max(...this.drivingData.map(d => d.speed))
        };
    }
    
    getPersonalizedTips(vehicleId) {
        const vehicle = window.aiEngine?.vehicleDatabase[vehicleId];
        const assessment = this.assessDrivingStyle();
        const tips = [];
        
        if (vehicle?.turbo && assessment.style === 'Conservative') {
            tips.push('Your driving is conservative. Consider using Sport mode more often to enjoy your turbo\'s powerband.');
        }
        
        if (vehicle?.turbo && assessment.avgRPM < 2500) {
            tips.push('Turbo engines need RPM to spool. Try keeping RPM above 2500 in normal driving for better response.');
        }
        
        if (!vehicle?.turbo && assessment.style === 'Aggressive') {
            tips.push('NA engine power is in high RPM. For maximum acceleration, shift at redline.');
        }
        
        const tuneRec = this.getRecommendedTune(vehicleId);
        tips.push(`Based on your ${assessment.style.toLowerCase()} driving style, ${tuneRec}`);
        
        return tips;
    }
    
    getRecommendedTune(vehicleId) {
        const stats = this.assessDrivingStyle();
        if (stats.style === 'Aggressive') {
            return 'use an aggressive tune with launch control and reduced traction control.';
        }
        if (stats.style === 'Conservative') {
            return 'a conservative tune with earlier shift points will improve fuel economy.';
        }
        return 'the balanced Sport mode setting is ideal for your driving pattern.';
    }
    
    newSession() {
        this.drivingData = [];
        this.lastAdvice = '';
        this.lastAdviceTime = 0;
    }
}

window.tuningCoach = new TuningCoach();
