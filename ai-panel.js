// AutoDyno AI - Recommendations Panel Controller
function generateAIPlan() {
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const budget = parseInt(document.getElementById('budget-slider').value);
    const vehicle = window.vehicleManager ? window.vehicleManager.currentVehicle : 'bmw-m3';
    
    const recDiv = document.getElementById('ai-recommendations');
    recDiv.innerHTML = '<div class="text-center p-4"><div class="spinner-border text-primary"></div><p class="text-muted small">AI is analyzing your vehicle and goals...</p></div>';
    
    setTimeout(() => {
        const analysis = window.aiEngine.generateBuildPath(vehicle, budget, goal);
        displayRecommendations(analysis);
    }, 800);
}

function displayRecommendations(analysis) {
    const recDiv = document.getElementById('ai-recommendations');
    const installedParts = window.vehicleManager ? window.vehicleManager.getInstalledParts() : [];
    
    let html = `
        <div class="card bg-gradient-light border-0 rounded-4 p-4 mb-3">
            <h6 class="fw-bold text-primary mb-3">Build Summary: ${analysis.vehicle}</h6>
            <div class="row text-center g-3">
                <div class="col-4">
                    <div class="p-2 bg-success bg-opacity-10 rounded-3">
                        <h5 class="text-success mb-0">+${analysis.totalPowerGain.toFixed(0)} HP</h5>
                        <small class="text-muted">Power Gain</small>
                    </div>
                </div>
                <div class="col-4">
                    <div class="p-2 bg-warning bg-opacity-10 rounded-3">
                        <h5 class="text-warning mb-0">+${analysis.totalTorqueGain.toFixed(0)} Nm</h5>
                        <small class="text-muted">Torque Gain</small>
                    </div>
                </div>
                <div class="col-4">
                    <div class="p-2 bg-primary bg-opacity-10 rounded-3">
                        <h5 class="text-primary mb-0">$${analysis.totalCost.toLocaleString()}</h5>
                        <small class="text-muted">Total Cost</small>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="border-top pt-3">
            <h6 class="fw-bold mb-3">Recommended Parts (${analysis.parts.length})</h6>
            <div class="list-group list-group-flush bg-transparent">
    `;
    
    analysis.parts.forEach((part, idx) => {
        const isInstalled = installedParts.includes(part.id);
        const priorityColor = part.priority === 'high' ? 'danger' : part.priority === 'medium' ? 'warning' : 'secondary';
        html += `
            <div class="list-group-item bg-transparent border-0 border-start-${'border-' + priorityColor}-4 ps-0 mb-2">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <div class="d-flex align-items-center mb-1">
                            <span class="badge bg-${priorityColor} me-2">${part.priority.toUpperCase()}</span>
                            <strong class="text-dark">${idx + 1}. ${part.name}</strong>
                            ${isInstalled ? '<span class="badge bg-success ms-2">✓ Installed</span>' : ''}
                            <span class="badge bg-primary bg-opacity-10 text-primary ms-1">Stage ${part.stage}</span>
                        </div>
                        <small class="text-muted">${part.reason.substring(0, 100)}...</small>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold text-success">+${part.powerGain} HP</div>
                        <div class="small text-muted">$${part.cost}</div>
                        <span class="badge bg-info">${part.difficulty}h</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="alert alert-light border-primary mt-3 mb-0">
            <i class="fas fa-lightbulb text-primary me-2"></i>
            <small class="text-dark"><strong>AI Insight:</strong> ${analysis.notes[0]}</small>
        </div>
        
        <div class="mt-3 p-3 bg-light rounded-3">
            <h6 class="mb-2"><i class="fas fa-chart-line me-2 text-primary"></i>Performance Projection</h6>
            <div class="row text-center g-2">
                <div class="col-4">
                    <div class="small text-muted">0-60 mph</div>
                    <div class="h5 mb-0 text-primary">${analysis.estimated0_60}s</div>
                </div>
                <div class="col-4">
                    <div class="small text-muted">Power/Weight</div>
                    <div class="h5 mb-0 text-primary">${(analysis.projectedPower / analysis.vehicle.weight * 1000).toFixed(0)} hp/t</div>
                </div>
                <div class="col-4">
                    <div class="small text-muted">Total Investment</div>
                    <div class="h5 mb-0 text-primary">Stage ${Math.max(...analysis.parts.map(p => p.stage))}</div>
                </div>
            </div>
        </div>
    `;
    
    recDiv.innerHTML = html;
}

// Budget slider update
document.getElementById('budget-slider')?.addEventListener('input', function() {
    document.getElementById('budget-display').textContent = '$' + parseInt(this.value).toLocaleString();
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Auto-generate initial recommendations after short delay
    setTimeout(generateAIPlan, 500);
});
