// AutoDyno AI - Intelligent Tuning Recommendation Engine (Enhanced)
class AIRecommendationEngine {
    constructor() {
        this.vehicleDatabase = {
            'bmw-m3': {
                make: 'BMW', model: 'M3', type: 'sedan', engine: 'I6 Twin-Turbo', basePower: 503, torque: 550, weight: 1500,
                Drivetrain: 'RWD', redline: 7200, turbo: true, cylinders: 6, displacement: '3.0L'
            },
            'mustang-gt': {
                make: 'Ford', model: 'Mustang GT', type: 'coupe', engine: 'V8 NA', basePower: 480, torque: 420, weight: 1700,
                Drivetrain: 'RWD', redline: 7000, turbo: false, cylinders: 8, displacement: '5.0L'
            },
            'audi-rs6': {
                make: 'Audi', model: 'RS6 Avant', type: 'wagon', engine: 'V8 Twin-Turbo', basePower: 591, torque: 800, weight: 2000,
                Drivetrain: 'AWD', redline: 6800, turbo: true, cylinders: 8, displacement: '4.0L'
            },
            'amg-gt': {
                make: 'Mercedes', model: 'AMG GT', type: 'coupe', engine: 'V8 Twin-Turbo', basePower: 577, torque: 700, weight: 1800,
                Drivetrain: 'RWD', redline: 6800, turbo: true, cylinders: 8, displacement: '4.0L'
            },
            'supra': {
                make: 'Toyota', model: 'GR Supra', type: 'coupe', engine: 'I6 Twin-Turbo', basePower: 382, torque: 500, weight: 1500,
                Drivetrain: 'RWD', redline: 7000, turbo: true, cylinders: 6, displacement: '3.0L'
            },
            'gtr': {
                make: 'Nissan', model: 'GT-R', type: 'coupe', engine: 'V6 Twin-Turbo', basePower: 565, torque: 633, weight: 1740,
                Drivetrain: 'AWD', redline: 7000, turbo: true, cylinders: 6, displacement: '3.8L'
            },
            'civic-type-r': {
                make: 'Honda', model: 'Civic Type R', type: 'hatchback', engine: 'I4 Turbo', basePower: 315, torque: 420, weight: 1430,
                Drivetrain: 'FWD', redline: 7000, turbo: true, cylinders: 4, displacement: '2.0L'
            },
            'corvette': {
                make: 'Chevrolet', model: 'Corvette C8', type: 'coupe', engine: 'V8 Twin-Turbo', basePower: 670, torque: 760, weight: 1600,
                Drivetrain: 'RWD', redline: 6500, turbo: true, cylinders: 8, displacement: '5.5L'
            }
        };
        
        this.partsDatabase = this.initializeParts();
    }
    
    initializeParts() {
        return [
            {
                id: 'cold-air-intake',
                name: 'Cold Air Intake System',
                category: 'intake',
                powerGain: 12,
                torqueGain: 18,
                cost: 499,
                difficulty: 1, // hours
                stages: [1],
                description: 'High-flow conical air filter with thermal shield. Increases airflow by 40%, reduces intake temperature by 15°C.',
                compatible: ['all'],
                requiredECU: false,
                warrantyRisk: 'Low'
            },
            {
                id: 'exhaust-system',
                name: 'Cat-Back Exhaust System',
                category: 'exhaust',
                powerGain: 18,
                torqueGain: 15,
                cost: 1299,
                difficulty: 2,
                stages: [1],
                description: 'Stainless steel performance exhaust with free-flow mufflers. Improves exhaust scavenging.',
                compatible: ['all'],
                requiredECU: false,
                warrantyRisk: 'Low'
            },
            {
                id: 'downpipe',
                name: 'Mandrel Bent Downpipe (High-Flow Cat)',
                category: 'exhaust',
                powerGain: 20,
                torqueGain: 22,
                cost: 699,
                difficulty: 3,
                stages: [2],
                description: 'Replaces restrictive factory downpipe. Requires tune for full benefit.',
                requiredECU: true,
                requires: ['exhaust-system'],
                warrantyRisk: 'Medium',
                compatible: ['turbo']
            },
            {
                id: 'intercooler-upgrade',
                name: 'Front Mount Intercooler Kit',
                category: 'forced-induction',
                powerGain: 25,
                torqueGain: 30,
                cost: 899,
                difficulty: 4,
                stages: [2],
                description: 'Larger core intercooler reduces intake temps by 40-50°C under boost. Essential for high-power builds.',
                requiredECU: false,
                compatible: ['turbo'],
                warrantyRisk: 'Medium'
            },
            {
                id: 'ecu-remap-stage1',
                name: 'Stage 1 ECU Tune (91+ Octane)',
                category: 'tuning',
                powerGain: 45,
                torqueGain: 50,
                cost: 599,
                difficulty: 0.5,
                stages: [1],
                description: 'Optimized fuel and ignition timing for 91+ octane. No hardware required. Increases boost by 2-3 psi on turbos.',
                requires: ['intake', 'exhaust'],
                requiredECU: true,
                warrantyRisk: 'Medium',
                notes: 'Typically adds 10-15% more power'
            },
            {
                id: 'ecu-remap-stage2',
                name: 'Stage 2 ECU Tune (E85 Compatible)',
                category: 'tuning',
                powerGain: 75,
                torqueGain: 85,
                cost: 799,
                difficulty: 1,
                stages: [2],
                description: 'Aggressive tune for fully bolted cars. Requires supporting mods. Supports E85 flex-fuel.',
                requires: ['intake', 'exhaust', 'downpipe', 'intercooler-upgrade', 'fuel-pump'],
                requiredECU: true,
                warrantyRisk: 'High',
                notes: 'May void warranty, use responsibly'
            },
            {
                id: 'fuel-pump',
                name: 'Upgraded High-Flow Fuel Pump',
                category: 'fuel',
                powerGain: 0,
                torqueGain: 0,
                cost: 299,
                difficulty: 2,
                stages: [2],
                description: 'Supports up to 500 WHPS on most platforms. Prevents fuel starvation at high RPM.',
                requiredECU: false,
                compatible: ['turbo', 'supercharged'],
                warrantyRisk: 'Low'
            },
            {
                id: 'injectors',
                name: 'High-Flow Fuel Injectors',
                category: 'fuel',
                powerGain: 0,
                torqueGain: 0,
                cost: 449,
                difficulty: 3,
                stages: [2],
                description: 'Increased flow rate (usually 50-100% over stock). Necessary for high-horsepower builds.',
                requires: ['fuel-pump'],
                requiredECU: true,
                compatible: ['turbo', 'supercharged'],
                warrantyRisk: 'Medium'
            },
            {
                id: 'turbocharger',
                name: 'Complete Turbocharger Kit',
                category: 'forced-induction',
                powerGain: 150,
                torqueGain: 180,
                cost: 4999,
                difficulty: 5,
                stages: [3],
                description: 'Full bolt-on turbo system including manifold, turbo, intercooler, downpipe, and all hardware.',
                compatible: ['v6', 'v8', 'i4', 'i6'],
                requiredECU: true,
                warrantyRisk: 'High',
                notes: 'Major engine modification'
            },
            {
                id: 'supercharger',
                name: 'Supercharger Kit',
                category: 'forced-induction',
                powerGain: 135,
                torqueGain: 160,
                cost: 5999,
                difficulty: 5,
                stages: [3],
                description: 'Positive displacement supercharger. Instant throttle response, linear power delivery.',
                compatible: ['v8', 'v6'],
                requiredECU: true,
                warrantyRisk: 'High',
                notes: 'Requires engine reinforcement'
            },
            {
                id: 'stage2-cam',
                name: 'Stage 2 Camshaft Kit',
                category: 'engine',
                powerGain: 30,
                torqueGain: 25,
                cost: 899,
                difficulty: 4,
                stages: [2],
                description: 'Aggressive cam profile for increased lift and duration. Best with head work.',
                compatible: ['v8', 'v6', 'i6'],
                requiredECU: true,
                warrantyRisk: 'High',
                notes: 'May affect idle quality'
            },
            {
                id: 'forged-internals',
                name: 'Forged Internals (Pistons/Rods)',
                category: 'engine',
                powerGain: 0,
                torqueGain: 0,
                cost: 2499,
                difficulty: 5,
                stages: [3],
                description: 'Complete forged assembly for high-RPM/high-boost reliability. Essential for 500+ HP.',
                requires: ['turbocharger', 'supercharger', 'stage2-cam'],
                requiredECU: true,
                compatible: ['all'],
                warrantyRisk: 'Maximum',
                notes: 'Engine rebuild required'
            },
            {
                id: 'suspension',
                name: 'Performance Suspension Kit',
                category: 'handling',
                powerGain: 0,
                torqueGain: 0,
                cost: 1299,
                difficulty: 3,
                stages: [2],
                description: 'Lowering springs, performance dampers, upgraded bushings. Improves cornering Gs by 0.3+',
                compatible: ['all'],
                warrantyRisk: 'Low'
            },
            {
                id: 'brakes',
                name: 'Big Brake Kit (6-Piston)',
                category: 'brakes',
                powerGain: 0,
                torqueGain: 0,
                cost: 1999,
                difficulty: 4,
                stages: [3],
                description: 'Drilled/slotted 2-piece rotors with 6-piston calipers. 40% better stopping power.',
                compatible: ['all'],
                warrantyRisk: 'Low'
            },
            {
                id: 'tires',
                name: 'High-Performance Summer Tires',
                category: 'wheels',
                powerGain: 0,
                torqueGain: 0,
                cost: 1200,
                difficulty: 1,
                stages: [1],
                description: 'Softer compound tires (e.g., Michelin Pilot Sport 4S). 15% better grip in dry/wet.',
                compatible: ['all'],
                warrantyRisk: 'None',
                notes: 'Wear faster than all-seasons'
            },
            {
                id: 'lightweight-wheels',
                name: 'Lightweight Forged Wheels',
                category: 'wheels',
                powerGain: 5,
                torqueGain: 3,
                cost: 2500,
                difficulty: 1,
                stages: [2],
                description: 'Reduces unsprung weight by 15-20 lbs per wheel. Improves acceleration and handling.',
                compatible: ['all'],
                warrantyRisk: 'Low'
            },
            {
                id: 'nitrous-kit',
                name: 'Nitrous Oxide System (100 HP)',
                category: 'forced-induction',
                powerGain: 100,
                torqueGain: 120,
                cost: 1500,
                difficulty: 4,
                stages: [2],
                description: 'On-demand nitrous injection. 100 HP shot wet system with bottle and solenoids.',
                compatible: ['all'],
                requiredECU: true,
                warrantyRisk: 'High',
                notes: 'For track use only, engine damage if misused'
            },
            {
                id: 'clutch-upgrade',
                name: 'Performance Clutch Kit',
                category: 'drivetrain',
                powerGain: 0,
                torqueGain: 0,
                cost: 800,
                difficulty: 4,
                stages: [2],
                description: 'Heavy-duty clutch and pressure plate. Handles increased torque without slippage.',
                compatible: ['rwd', 'fwd', 'awd'],
                warrantyRisk: 'Medium',
                notes: 'May increase pedal effort'
            },
            {
                id: 'limited-slip',
                name: 'Limited Slip Differential',
                category: 'drivetrain',
                powerGain: 0,
                torqueGain: 0,
                cost: 1800,
                difficulty: 4,
                stages: [2],
                description: 'Clutch-type or helical LSD. Improves traction and cornering exit speed.',
                compatible: ['rwd', 'fwd', 'awd'],
                warrantyRisk: 'Medium'
            }
        ];
    }
    
    // Analyze vehicle and generate recommendations
    analyzeVehicle(vehicleId, currentParts = [], goal = 'daily', maxBudget = 5000) {
        const vehicle = this.vehicleDatabase[vehicleId];
        if (!vehicle) return { error: 'Vehicle not found' };
        
        const goalConfig = this.getGoalConfig(goal);
        let totalCost = 0;
        let totalPowerGain = 0;
        let totalTorqueGain = 0;
        const recommendations = [];
        
        // Get compatible parts
        let parts = this.partsDatabase.filter(part => 
            part.compatible === 'all' || 
            part.compatible.includes(vehicle.type) ||
            this.isEngineCompatible(part, vehicle.engine)
        );
        
        // Stage 1: Essential mods (no dependencies or easy ones)
        const stage1Parts = parts.filter(p => 
            p.stages.includes(1) && 
            !currentParts.includes(p.id) &&
            this.checkDependencies(currentParts, p, recommendations)
        );
        
        stage1Parts.forEach(part => {
            if (this.shouldAddPart(part, recommendations, totalCost, maxBudget, goalConfig, vehicle)) {
                recommendations.push(this.createRecommendation(part, vehicle, totalPowerGain, 'high'));
                totalCost += part.cost;
                totalPowerGain += part.powerGain;
                totalTorqueGain += part.torqueGain;
            }
        });
        
        // Stage 2: Intermediate (if budget allows)
        if (totalCost < maxBudget * 0.7 && goalConfig.minStage <= 2) {
            const stage2Parts = parts.filter(p => 
                p.stages.includes(2) && 
                !currentParts.includes(p.id) &&
                !recommendations.some(r => r.id === p.id) &&
                this.checkDependencies(currentParts, p, recommendations)
            );
            
            stage2Parts.forEach(part => {
                if (this.shouldAddPart(part, recommendations, totalCost, maxBudget, goalConfig, vehicle)) {
                    recommendations.push(this.createRecommendation(part, vehicle, totalPowerGain, 'medium'));
                    totalCost += part.cost;
                    totalPowerGain += part.powerGain;
                    totalTorqueGain += part.torqueGain;
                }
            });
        }
        
        // Stage 3: Advanced (only for high power goals)
        if (totalCost < maxBudget * 0.5 && goalConfig.powerPreference === 'extreme') {
            const stage3Parts = parts.filter(p => 
                p.stages.includes(3) && 
                !currentParts.includes(p.id) &&
                !recommendations.some(r => r.id === p.id) &&
                this.checkDependencies(currentParts, p, recommendations)
            );
            
            stage3Parts.forEach(part => {
                if (this.shouldAddPart(part, recommendations, totalCost, maxBudget, goalConfig, vehicle)) {
                    recommendations.push(this.createRecommendation(part, vehicle, totalPowerGain, 'low'));
                    totalCost += part.cost;
                    totalPowerGain += part.powerGain;
                    totalTorqueGain += part.torqueGain;
                }
            });
        }
        
        // Always check for tire upgrade if not present
        if (!currentParts.includes('tires') && totalCost + 1200 <= maxBudget) {
            const tires = this.partsDatabase.find(p => p.id === 'tires');
            if (tires) {
                recommendations.push({
                    ...tires,
                    priority: 'high',
                    reason: 'Critical safety and performance upgrade. All power gains require proper tires to put down.',
                    stage: 1,
                    estimatedHP: vehicle.basePower + totalPowerGain
                });
                totalCost += tires.cost;
            }
        }
        
        return {
            vehicle: { ...vehicle },
            basePower: vehicle.basePower,
            baseTorque: vehicle.torque,
            projectedPower: vehicle.basePower + totalPowerGain,
            projectedTorque: vehicle.torque + totalTorqueGain,
            totalCost,
            goal: goal,
            recommendations: recommendations.sort((a, b) => {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
        };
    }
    
    isEngineCompatible(part, engine) {
        if (part.compatible.includes('all')) return true;
        const engineType = engine.split(' ')[0].toLowerCase();
        return part.compatible.includes(engineType);
    }
    
    checkDependencies(currentParts, part, installed) {
        if (!part.requires) return true;
        
        // Check if all required parts are either already installed OR in the current recommendation batch
        const requiredParts = part.requires.map(reqId => {
            // Handle conditional requirements
            if (reqId.includes('|')) {
                const options = reqId.split('|');
                return options.some(opt => currentParts.includes(opt.trim()) || installed.some(p => p.id === opt.trim()));
            }
            return currentParts.includes(reqId) || installed.some(p => p.id === reqId);
        });
        
        return requiredParts.every(Boolean);
    }
    
    shouldAddPart(part, recommendations, currentCost, maxBudget, goalConfig, vehicle) {
        // Budget check
        if (currentCost + part.cost > maxBudget) return false;
        
        // Goal power preference filter
        if (goalConfig.powerPreference === 'low' && part.powerGain > 30) return false;
        if (goalConfig.powerPreference === 'moderate' && part.powerGain > 80 && part.difficulty > 3) return false;
        
        // Turbo-specific: Intercooler needed before ECU stage2
        if (part.id === 'ecu-remap-stage2' && !this.hasTurboParts(recommendations, currentParts) && vehicle.turbo) {
            return false;
        }
        
        // NA engines can\'t have turbo parts
        if (!vehicle.turbo && part.category === 'forced-induction' && part.id !== 'nitrous-kit') {
            return false;
        }
        
        return true;
    }
    
    hasTurboParts(recommendations, currentParts) {
        const turboParts = ['intercooler-upgrade', 'downpipe', 'turbocharger'];
        return turboParts.some(partId => 
            currentParts.includes(partId) || recommendations.some(r => r.id === partId)
        );
    }
    
    createRecommendation(part, vehicle, currentPowerGain, priority) {
        return {
            ...part,
            priority,
            reason: this.generateReason(part, vehicle, currentPowerGain),
            stage: part.stages[0],
            estimatedHP: vehicle.basePower + currentPowerGain + part.powerGain
        };
    }
    
    generateReason(part, vehicle, currentPower) {
        const reasons = {
            'cold-air-intake': `First mod for ${vehicle.make}. Simple power increase with no downsides. Great foundation.`,
            'exhaust-system': `Improves flow, sound, and pairs well with future modifications. Essential for all builds.`,
            'ecu-remap-stage1': `Largest bang-for-buck. Unlocks hidden potential in factory tune. Must do after intake/exhaust.`,
            'downpipe': `For turbo cars: eliminates restrictive catalytic converter. Major power gain when tuned.`,
            'intercooler-upgrade': `For turbo cars: keeps intake temps down, prevents heat soak, enables more aggressive tuning.`,
            'fuel-pump': `Required for Stage 2+ on turbo cars. Prevents fuel starvation at high RPM/load.`,
            'suspension': `Balances handling with increased power. Critical for track and twisty roads.`,
            'turbocharger': `Maximum power build. Requires full supporting mods and professional installation.`,
            'tires': `You need grip to use the power. Upgrade tires before adding major power.`
        };
        
        return reasons[part.id] || 
            `${part.name} - Stage ${part.stages[0]} upgrade for ${part.category}. Power gain: +${part.powerGain} HP.`;
    }
    
    getGoalConfig(goal) {
        const configs = {
            'daily': { focus: 'drivability', powerPreference: 'moderate', budget: 2000, minStage: 1 },
            'track': { focus: 'performance', powerPreference: 'high', budget: 8000, minStage: 1 },
            'drag': { focus: 'straight-line', powerPreference: 'extreme', budget: 12000, minStage: 2 },
            'street': { focus: 'balanced', powerPreference: 'high', budget: 5000, minStage: 1 },
            'show': { focus: 'aesthetics', powerPreference: 'low', budget: 3000, minStage: 1 }
        };
        return configs[goal] || configs['daily'];
    }
    
    // Generate custom ECU tune based on installed parts
    generateTune(vehicleId, partsInstalled, drivingStyle = 'balanced') {
        const vehicle = this.vehicleDatabase[vehicleId];
        if (!vehicle) return { error: 'Vehicle not found' };
        
        const baseMap = {
            fuelTrim: 0,
            timingAdvance: 24,
            boostTarget: vehicle.turbo ? 14.5 : 0,
            revLimit: vehicle.redline,
            launchControl: false,
            tractionControl: 70,
            afrTarget: 14.7,
            camAdvance: 0
        };
        
        // Calculate total power gain
        let totalPowerGain = 0;
        let hasTurbo = vehicle.turbo;
        let hasForcedInduction = false;
        let isHighRev = false;
        
        partsInstalled.forEach(partId => {
            const part = this.partsDatabase.find(p => p.id === partId);
            if (part) {
                totalPowerGain += part.powerGain;
                if (part.compatible.includes('turbo')) hasForcedInduction = true;
                if (part.id === 'turbocharger' || part.id === 'supercharger') hasTurbo = true;
                if (part.id === 'stage2-cam') isHighRev = true;
            }
        });
        
        // Tune calculations based on mods
        const powerFactor = Math.min(totalPowerGain / 100, 1.5); // Cap at 150%
        
        if (hasForcedInduction || vehicle.turbo) {
            // Turbo tune logic
            baseMap.boostTarget = 14.5 + Math.round(powerFactor * 10);
            baseMap.timingAdvance = Math.min(34, 24 + Math.round(powerFactor * 8));
            baseMap.afrTarget = 12.5; // Richer for power
        } else {
            // NA tune logic
            baseMap.timingAdvance = Math.min(38, 24 + Math.round(powerFactor * 12));
            baseMap.afrTarget = 13.5;
            baseMap.camAdvance = isHighRev ? 10 : 0;
        }
        
        baseMap.revLimit = Math.min(vehicle.redline + Math.round(powerFactor * 200), vehicle.redline + 500);
        
        // Adjust for driving style
        const styleFactors = {
            'aggressive': { launch: true, tc: 20, timing: +2 },
            'balanced': { launch: false, tc: 50, timing: 0 },
            'conservative': { launch: false, tc: 90, timing: -2 },
            'daily': { launch: false, tc: 70, timing: -1 }
        };
        
        const style = styleFactors[drivingStyle] || styleFactors['balanced'];
        baseMap.launchControl = style.launch;
        baseMap.tractionControl = style.tc;
        baseMap.timingAdvance += style.timing;
        
        // Fuel trim adjustment based on power gain
        if (totalPowerGain > 50) {
            baseMap.fuelTrim = totalPowerGain > 100 ? 8 : 5;
        }
        
        return {
            vehicle: `${vehicle.make} ${vehicle.model}`,
            basePower: vehicle.basePower,
            projectedPower: vehicle.basePower + totalPowerGain,
            map: baseMap,
            notes: this.generateTuneNotes(partsInstalled, vehicle, drivingStyle, totalPowerGain)
        };
    }
    
    generateTuneNotes(parts, vehicle, style, powerGain) {
        const notes = [];
        
        if (powerGain > 100) {
            notes.push('High power build: Regular maintenance critical. Check fluids weekly.');
        }
        
        if (parts.includes('turbocharger')) {
            notes.push('Major turbo installation: Break-in period recommended. Avoid high boost for first 500 miles.');
        }
        
        if (parts.includes('ecu-remap-stage2')) {
            notes.push('Stage 2 tune: Use 91+ octane minimum. Consider ethanol blend (E30-E85) for more power.');
        }
        
        if (vehicle.turbo && !parts.includes('intercooler-upgrade')) {
            notes.push('Warning: Turbocharged vehicle without upgraded intercooler may experience heat soak.');
        }
        
        if (style === 'aggressive' && parts.includes('limited-slip')) {
            notes.push('Aggressive driving with LSD: Expect quicker tire wear. Rotate tires every 3000 miles.');
        }
        
        return notes.length ? notes : ['Tune optimized for your vehicle configuration and driving style.'];
    }
    
    // ROI analysis
    analyzeROI(recommendations) {
        return recommendations.map(rec => {
            const costPerHP = rec.powerGain > 0 ? (rec.cost / rec.powerGain).toFixed(0) : 'N/A';
            let rating = 3;
            if (costPerHP !== 'N/A' && costPerHP < 100) rating = 5;
            else if (costPerHP !== 'N/A' && costPerHP < 200) rating = 4;
            else if (costPerHP !== 'N/A' && costPerHP > 500) rating = 2;
            
            return {
                part: rec.name,
                cost: rec.cost,
                powerGain: rec.powerGain,
                costPerHP: costPerHP === 'N/A' ? 'N/A' : `$${costPerHP}/HP`,
                rating,
                priority: rec.priority,
                roi: this.calculateROIScore(rec.cost, rec.powerGain, rec.difficulty)
            };
        }).sort((a, b) => b.roi - a.roi);
    }
    
    calculateROIScore(cost, powerGain, difficulty) {
        if (powerGain === 0) return 0;
        const hpPerDollar = powerGain / cost;
        const difficultyPenalty = difficulty * 0.1;
        return Math.round((hpPerDollar * 1000) - difficultyPenalty);
    }
    
    generateBuildPath(vehicleId, budget, goal) {
        const analysis = this.analyzeVehicle(vehicleId, [], goal, budget);
        return {
            summary: `Build for ${analysis.vehicle.make} ${analysis.vehicle.model} with $${budget} budget (${goal}):`,
            totalPowerGain: analysis.projectedPower - analysis.basePower,
            totalTorqueGain: analysis.projectedTorque - analysis.baseTorque,
            totalCost: analysis.totalCost,
            parts: analysis.recommendations,
            estimated0_60: this.estimateZeroSixty(analysis.vehicle.weight, analysis.projectedPower),
            notes: this.getGoalSpecificNotes(goal, analysis.vehicle),
            roiAnalysis: this.analyzeROI(analysis.recommendations)
        };
    }
    
    estimateZeroSixty(weight, horsepower) {
        // More sophisticated estimate based on power-to-weight ratio
        const powerToWeight = horsepower / weight * 1000;
        const base = 10.5;
        return Math.max(2.5, base - (powerToWeight * 0.15)).toFixed(1);
    }
    
    getGoalSpecificNotes(goal, vehicle) {
        const notes = {
            'daily': [
                `Build prioritized comfort and reliability for daily driving in your ${vehicle.model}.`,
                'Stage 1 mods recommended for daily use—minimal impact on reliability.'
            ],
            'track': [
                `Track-focused build for ${vehicle.model}. Optimized for lap times and cooling.`,
                'Recommend brake pads, fluid, and tire warmers before track days.'
            ],
            'drag': [
                `Quarter-mile optimized ${vehicle.model}. Focus on power and traction for consistent passes.`,
                'Consider drivetrain upgrades (clutch, LSD) if AWD/FWD.'
            ],
            'street': [
                `Street performance build. Balance of power and drivability for ${vehicle.model}.`,
                'Muffler delete optional for aggressive sound without losing low-end torque.'
            ]
        };
        return notes[goal] || [`Custom build for ${vehicle.model}.`];
    }
}

window.aiEngine = new AIRecommendationEngine();


