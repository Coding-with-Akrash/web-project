// AutoDyno AI - Enhanced Main Controller (Blue Theme)
document.addEventListener("DOMContentLoaded", function() {
    initCharts();
    startLiveDataUpdates();
    initChatAssistant();
    animateStats();
    initDynoPage();
    initPartsCatalog();
    initVehicleSelect();
});

let realtimeChart, dynoChart, liveChart, dynoCurveChart;
let realtimeData = [];
let dynoRunning = false;
let dynoInterval = null;
let maxDataPoints = 30;

function initCharts() {
    // Real-time performance chart (on index)
    const ctx1 = document.getElementById("realtimeChart");
    if (ctx1) {
        realtimeChart = new Chart(ctx1.getContext("2d"), {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "RPM x1000",
                        data: [],
                        borderColor: "#2D89BA",
                        backgroundColor: "rgba(45, 137, 186, 0.1)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: "Speed (km/h)",
                        data: [],
                        borderColor: "#38BDF8",
                        backgroundColor: "rgba(56, 189, 248, 0.1)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: "#0F172A" } }
                },
                scales: {
                    x: {
                        grid: { color: "rgba(0,0,0,0.05)" },
                        ticks: { color: "#64748B" }
                    },
                    y: {
                        grid: { color: "rgba(0,0,0,0.05)" },
                        ticks: { color: "#64748B" },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Live performance chart on dyno page
    const ctxLive = document.getElementById("liveChart");
    if (ctxLive) {
        liveChart = new Chart(ctxLive.getContext("2d"), {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    { 
                        label: "HP", 
                        data: [], 
                        borderColor: "#10B981", 
                        backgroundColor: "rgba(16, 185, 129, 0.2)", 
                        fill: true, 
                        tension: 0.4, 
                        pointRadius: 0 
                    },
                    { 
                        label: "Torque (Nm)", 
                        data: [], 
                        borderColor: "#F59E0B", 
                        backgroundColor: "rgba(245, 158, 11, 0.2)", 
                        fill: true, 
                        tension: 0.4, 
                        pointRadius: 0 
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: "#0F172A" } } },
                scales: {
                    x: { grid: { color: "rgba(0,0,0,0.05)" }, ticks: { color: "#64748B" } },
                    y: { grid: { color: "rgba(0,0,0,0.05)" }, ticks: { color: "#64748B" } }
                }
            }
        });
    }

    // Dyno power & torque curve (index page)
    const ctxDyno = document.getElementById("dynoChart");
    if (ctxDyno) {
        const dynoData = window.obdSimulator.generateDynoCurve();
        dynoChart = new Chart(ctxDyno.getContext("2d"), {
            type: "line",
            data: {
                labels: dynoData.map(d => d.rpm),
                datasets: [
                    { 
                        label: "Torque (Nm)", 
                        data: dynoData.map(d => d.torque), 
                        borderColor: "#10B981", 
                        backgroundColor: "rgba(16, 185, 129, 0.1)", 
                        fill: true, 
                        tension: 0.4, 
                        yAxisID: "y" 
                    },
                    { 
                        label: "Power (HP)", 
                        data: dynoData.map(d => d.horsepower), 
                        borderColor: "#2D89BA", 
                        backgroundColor: "rgba(45, 137, 186, 0.1)", 
                        fill: true, 
                        tension: 0.4, 
                        yAxisID: "y1" 
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: "index", intersect: false },
                plugins: { legend: { labels: { color: "#0F172A" } } },
                scales: {
                    x: { 
                        title: { display: true, text: "RPM", color: "#64748B" }, 
                        grid: { color: "rgba(0,0,0,0.05)" }, 
                        ticks: { color: "#64748B" } 
                    },
                    y: { 
                        type: "linear", 
                        display: true, 
                        position: "left", 
                        title: { display: true, text: "Torque (Nm)", color: "#10B981" }, 
                        grid: { color: "rgba(0,0,0,0.05)" }, 
                        ticks: { color: "#10B981" } 
                    },
                    y1: { 
                        type: "linear", 
                        display: true, 
                        position: "right", 
                        title: { display: true, text: "Power (HP)", color: "#2D89BA" }, 
                        grid: { drawOnChartArea: false }, 
                        ticks: { color: "#2D89BA" } 
                    }
                }
            }
        });
    }

    // Dyno curve on dyno-tune page
    const ctxDynoCurve = document.getElementById("dynoCurveChart");
    if (ctxDynoCurve) {
        dynoCurveChart = new Chart(ctxDynoCurve.getContext("2d"), {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    { 
                        label: "Torque (Nm)", 
                        data: [], 
                        borderColor: "#10B981", 
                        backgroundColor: "rgba(16, 185, 129, 0.1)", 
                        fill: true, 
                        tension: 0.4, 
                        yAxisID: "y" 
                    },
                    { 
                        label: "Power (HP)", 
                        data: [], 
                        borderColor: "#2D89BA", 
                        backgroundColor: "rgba(45, 137, 186, 0.1)", 
                        fill: true, 
                        tension: 0.4, 
                        yAxisID: "y1" 
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: "index", intersect: false },
                plugins: { legend: { labels: { color: "#0F172A" } } },
                scales: {
                    x: { 
                        title: { display: true, text: "RPM", color: "#64748B" }, 
                        grid: { color: "rgba(0,0,0,0.05)" }, 
                        ticks: { color: "#64748B" } 
                    },
                    y: { 
                        type: "linear", 
                        display: true, 
                        position: "left", 
                        title: { display: true, text: "Torque (Nm)", color: "#10B981" }, 
                        grid: { color: "rgba(0,0,0,0.05)" }, 
                        ticks: { color: "#10B981" } 
                    },
                    y1: { 
                        type: "linear", 
                        display: true, 
                        position: "right", 
                        title: { display: true, text: "Power (HP)", color: "#2D89BA" }, 
                        grid: { drawOnChartArea: false }, 
                        ticks: { color: "#2D89BA" } 
                    }
                }
            }
        });
    }
}

function startLiveDataUpdates() {
    setInterval(() => {
        const data = window.obdSimulator.getData();
        updateDashboard(data);
        if (dynoRunning) {
            updateDynoChart(data);
        }
    }, 100);
}

function updateDashboard(data) {
    // Update index gauges
    const rpmVal = document.getElementById("rpm-value");
    const speedVal = document.getElementById("speed-value");
    const tempVal = document.getElementById("temp-value");
    
    if (rpmVal) rpmVal.textContent = (data.rpm / 1000).toFixed(1);
    if (speedVal) speedVal.textContent = Math.round(data.speed);
    if (tempVal) tempVal.textContent = Math.round(data.coolantTemp);

    // Update dyno page gauges
    const rpmDisplay = document.getElementById("rpm-display");
    const speedDisplay = document.getElementById("speed-display");
    const hpDisplay = document.getElementById("hp-display");
    const torqueDisplay = document.getElementById("torque-display");
    const tempDisplay = document.getElementById("temp-display");
    
    if (rpmDisplay) rpmDisplay.textContent = Math.round(data.rpm);
    if (speedDisplay) speedDisplay.textContent = Math.round(data.speed);
    if (hpDisplay) hpDisplay.textContent = Math.round(window.obdSimulator.horsepower);
    if (torqueDisplay) torqueDisplay.textContent = Math.round(window.obdSimulator.torque);
    if (tempDisplay) tempDisplay.textContent = Math.round(data.coolantTemp) + "°";

    // Update progress bars on index
    const rpmBar = document.getElementById("rpm-bar");
    const speedBar = document.getElementById("speed-bar");
    const tempBar = document.getElementById("temp-bar");
    
    if (rpmBar) rpmBar.style.width = Math.min((data.rpm / 8000) * 100, 100) + "%";
    if (speedBar) speedBar.style.width = Math.min((data.speed / 200) * 100, 100) + "%";
    if (tempBar) tempBar.style.width = Math.min(((data.coolantTemp - 60) / 140) * 100, 100) + "%";

    // Update realtime chart on index
    if (realtimeChart && realtimeChart.data) {
        const now = new Date().toLocaleTimeString();
        if (realtimeData.length >= maxDataPoints) {
            realtimeData.shift();
            realtimeChart.data.labels.shift();
            realtimeChart.data.datasets[0].data.shift();
            realtimeChart.data.datasets[1].data.shift();
        }
        realtimeData.push({ rpm: data.rpm / 1000, speed: data.speed });
        realtimeChart.data.labels.push(now);
        realtimeChart.data.datasets[0].data.push(data.rpm / 1000);
        realtimeChart.data.datasets[1].data.push(data.speed);
        realtimeChart.update("none");
    }

    // Update live chart on dyno page
    if (liveChart && dynoRunning) {
        const now = new Date().toLocaleTimeString();
        if (liveChart.data.labels.length >= 50) {
            liveChart.data.labels.shift();
            liveChart.data.datasets[0].data.shift();
            liveChart.data.datasets[1].data.shift();
        }
        liveChart.data.labels.push(now);
        liveChart.data.datasets[0].data.push(window.obdSimulator.horsepower);
        liveChart.data.datasets[1].data.push(window.obdSimulator.torque);
        liveChart.update("none");
    }
}

function updateDynoChart(data) {
    if (!window.dynoData) window.dynoData = [];
    window.dynoData.push({
        rpm: Math.round(data.rpm),
        torque: window.obdSimulator.torque,
        horsepower: window.obdSimulator.horsepower
    });
}

function initDynoPage() {
    const startBtn = document.getElementById("start-dyno");
    const stopBtn = document.getElementById("stop-dyno");
    const simulateBtn = document.getElementById("simulate-accel");
    const statusBadge = document.getElementById("dyno-status");
    const rpmLimitSlider = document.getElementById("rpm-limit");
    const rpmLimitValue = document.getElementById("rpm-limit-value");
    
    if (startBtn) {
        startBtn.addEventListener("click", function() {
            startDynoRun();
            if (statusBadge) statusBadge.textContent = "Running";
            statusBadge.className = "badge bg-danger";
            startBtn.disabled = true;
            stopBtn.disabled = false;
        });
    }
    
    if (stopBtn) {
        stopBtn.addEventListener("click", function() {
            stopDynoRun();
            if (statusBadge) statusBadge.textContent = "Ready";
            statusBadge.className = "badge bg-success";
            startBtn.disabled = false;
            stopBtn.disabled = true;
        });
    }
    
    if (simulateBtn) {
        simulateBtn.addEventListener("click", function() {
            window.obdSimulator.accelerate();
        });
    }
    
    if (rpmLimitSlider) {
        rpmLimitSlider.addEventListener("input", function() {
            rpmLimitValue.textContent = this.value;
        });
    }

    // Tuning sliders
    const fuelTrim = document.getElementById("fuel-trim");
    if (fuelTrim) {
        fuelTrim.addEventListener("input", function() {
            document.getElementById("fuel-trim-value").textContent = this.value + "%";
        });
    }
    
    const timing = document.getElementById("timing");
    if (timing) {
        timing.addEventListener("input", function() {
            document.getElementById("timing-value").textContent = this.value + "°";
        });
    }
    
    const boost = document.getElementById("boost");
    if (boost) {
        boost.addEventListener("input", function() {
            document.getElementById("boost-value").textContent = this.value + " psi";
        });
    }

    // Apply tune button
    const applyTuneBtn = document.getElementById("apply-tune");
    if (applyTuneBtn) {
        applyTuneBtn.addEventListener("click", function() {
            alert("Tuning parameters applied! AI will now optimize your ECU map.");
            const modal = bootstrap.Modal.getInstance(document.getElementById("tuningModal"));
            if (modal) modal.hide();
        });
    }
}

function startDynoRun() {
    dynoRunning = true;
    window.dynoData = [];
    
    if (dynoCurveChart) {
        dynoCurveChart.data.labels = [];
        dynoCurveChart.data.datasets[0].data = [];
        dynoCurveChart.data.datasets[1].data = [];
        dynoCurveChart.update();
    }
    
    let rpm = 2000;
    const maxRpm = parseInt(document.getElementById("rpm-limit")?.value) || 8000;
    const step = (maxRpm - 2000) / 200;
    
    const dynoInterval = setInterval(() => {
        if (!dynoRunning || rpm > maxRpm) {
            clearInterval(dynoInterval);
            finishDynoRun();
            return;
        }
        
        window.obdSimulator.data.rpm = rpm;
        window.obdSimulator.calculatePerformance();
        rpm += step;
        
        if (dynoCurveChart) {
            dynoCurveChart.data.labels.push(Math.round(rpm));
            dynoCurveChart.data.datasets[0].data.push(window.obdSimulator.torque);
            dynoCurveChart.data.datasets[1].data.push(window.obdSimulator.horsepower);
            dynoCurveChart.update("none");
        }
        
        updatePeakStats();
    }, 30);
    
    window.dynoInterval = dynoInterval;
}

function stopDynoRun() {
    dynoRunning = false;
    if (window.dynoInterval) clearInterval(window.dynoInterval);
}

function finishDynoRun() {
    dynoRunning = false;
    console.log("Dyno run complete. Peak HP:", window.obdSimulator.horsepower.toFixed(1));
}

function updatePeakStats() {
    document.getElementById("peak-hp").textContent = Math.round(window.obdSimulator.horsepower);
    document.getElementById("peak-torque").textContent = Math.round(window.obdSimulator.torque);
    document.getElementById("peak-rpm").textContent = Math.round(window.obdSimulator.data.rpm);
    
    const power = window.obdSimulator.horsepower;
    const weight = 1500;
    const zero100 = 10.0 - (power / 100);
    document.getElementById("zero100").textContent = Math.max(2.5, zero100).toFixed(1);
}

function initPartsCatalog() {
    document.querySelectorAll(".part-card .btn-success").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const partName = this.closest(".part-card").querySelector("h5").textContent;
            const modal = new bootstrap.Modal(document.getElementById("installModal"));
            document.querySelector("#installModal .modal-body h6").textContent = "Install " + partName + "?";
            modal.show();
        });
    });
    
    const confirmBtn = document.getElementById("confirm-install");
    if (confirmBtn) {
        confirmBtn.addEventListener("click", function() {
            const modal = bootstrap.Modal.getInstance(document.getElementById("installModal"));
            if (modal) modal.hide();
            setTimeout(() => {
                alert("Part installed successfully! Check your dyno page for updated performance.");
            }, 300);
        });
    }
}

function initVehicleSelect() {
    document.querySelectorAll(".vehicle-card").forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px)";
            this.style.borderColor = "#2D89BA";
        });
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
            this.style.borderColor = "";
        });
    });
}

function animateStats() {
    const stats = [
        { id: "accuracy-stat", target: 98.2, suffix: "%" },
        { id: "time-stat", target: -65, suffix: "%" },
        { id: "power-stat", target: 22, suffix: "%" }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateNumber(element, 0, stat.target, 2000, stat.suffix);
        }
    });
}

function animateNumber(element, start, end, duration, suffix = "") {
    const startTime = performance.now();
    const isNegative = end < 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        element.textContent = (isNegative ? "-" : "+") + Math.abs(current).toFixed(1) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);
}

function initChatAssistant() {
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.querySelector(".scrollable-chat");
    
    if (chatInput && chatMessages) {
        chatInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter" && this.value.trim()) {
                const userMessage = this.value.trim();
                addChatMessage(userMessage, "user");
                this.value = "";
                
                setTimeout(() => {
                    const response = getAIResponse(userMessage);
                    addChatMessage(response, "bot");
                }, 500);
            }
        });
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.querySelector(".scrollable-chat");
    if (!chatMessages) return;
    
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message " + sender;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(query) {
    const q = query.toLowerCase();
    const data = window.obdSimulator.getData();
    const perf = window.obdSimulator.getPerformance();
    
    if (q.includes("rpm")) return "Current RPM: " + (data.rpm / 1000).toFixed(1) + "k";
    if (q.includes("speed")) return "Current speed: " + Math.round(data.speed) + " km/h";
    if (q.includes("power") || q.includes("hp")) return "Power: " + perf.horsepower + " HP | Torque: " + perf.torque + " Nm";
    if (q.includes("temp")) return "Coolant: " + Math.round(data.coolantTemp) + "°C";
    if (q.includes("tuning") || q.includes("recommend")) return "Enrich fuel mixture at 3000-5000 RPM for better mid-range torque. Consider timing advance of +2° if using premium fuel.";
    if (q.includes("parts") || q.includes("upgrade")) return "Best power gains: Turbo kit (+100HP), ECU remap (+45HP), Cam kit (+30HP).";
    if (q.includes("dyno") || q.includes("graph")) return "Your dyno curve shows healthy power delivery. Peak at ~5500 RPM. Would you like to run another test?";
    
    return "I can help with OBD data, tuning advice, parts recommendations, and dyno analysis. What do you need?";
}

// Expose global functions
window.runDynoTest = function() { /* placeholder */ };
window.animateNumber = animateNumber;
