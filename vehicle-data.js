// AutoDyno AI - Comprehensive Vehicle Database (Global + Pakistani)
const vehicleDatabase = {
    makes: [
        // German
        { id: 'bmw', name: 'BMW', country: 'Germany' },
        { id: 'audi', name: 'Audi', country: 'Germany' },
        { id: 'mercedes', name: 'Mercedes-Benz', country: 'Germany' },
        { id: 'porsche', name: 'Porsche', country: 'Germany' },
        { id: 'volkswagen', name: 'Volkswagen', country: 'Germany' },
        
        // Japanese
        { id: 'toyota', name: 'Toyota', country: 'Japan' },
        { id: 'nissan', name: 'Nissan', country: 'Japan' },
        { id: 'honda', name: 'Honda', country: 'Japan' },
        { id: 'mazda', name: 'Mazda', country: 'Japan' },
        { id: 'subaru', name: 'Subaru', country: 'Japan' },
        { id: 'mitsubishi', name: 'Mitsubishi', country: 'Japan' },
        { id: 'lexus', name: 'Lexus', country: 'Japan' },
        { id: 'infiniti', name: 'Infiniti', country: 'Japan' },
        { id: 'acura', name: 'Acura', country: 'Japan' },
        { id: 'suzuki', name: 'Suzuki', country: 'Japan' },
        { id: 'isuzu', name: 'Isuzu', country: 'Japan' },
        { id: 'daihatsu', name: 'Daihatsu', country: 'Japan' },
        
        // American
        { id: 'ford', name: 'Ford', country: 'USA' },
        { id: 'chevrolet', name: 'Chevrolet', country: 'USA' },
        { id: 'dodge', name: 'Dodge', country: 'USA' },
        { id: 'chrysler', name: 'Chrysler', country: 'USA' },
        { id: 'jeep', name: 'Jeep', country: 'USA' },
        { id: 'tesla', name: 'Tesla', country: 'USA' },
        { id: 'cadillac', name: 'Cadillac', country: 'USA' },
        { id: 'buick', name: 'Buick', country: 'USA' },
        { id: 'gmc', name: 'GMC', country: 'USA' },
        { id: 'ram', name: 'RAM', country: 'USA' },
        { id: 'lincoln', name: 'Lincoln', country: 'USA' },
        { id: 'corvette', name: 'Corvette', country: 'USA' },
        
        // Korean
        { id: 'hyundai', name: 'Hyundai', country: 'South Korea' },
        { id: 'kia', name: 'Kia', country: 'South Korea' },
        { id: 'genesis', name: 'Genesis', country: 'South Korea' },
        
        // British
        { id: 'land-rover', name: 'Land Rover', country: 'UK' },
        { id: 'jaguar', name: 'Jaguar', country: 'UK' },
        { id: 'bentley', name: 'Bentley', country: 'UK' },
        { id: 'rolls-royce', name: 'Rolls-Royce', country: 'UK' },
        { id: 'aston-martin', name: 'Aston Martin', country: 'UK' },
        { id: 'mclaren', name: 'McLaren', country: 'UK' },
        { id: 'mini', name: 'MINI', country: 'UK' },
        
        // Italian
        { id: 'ferrari', name: 'Ferrari', country: 'Italy' },
        { id: 'lamborghini', name: 'Lamborghini', country: 'Italy' },
        { id: 'paganis', name: 'Pagani', country: 'Italy' },
        { id: 'alfa-romeo', name: 'Alfa Romeo', country: 'Italy' },
        { id: 'maserati', name: 'Maserati', country: 'Italy' },
        { id: 'fiat', name: 'Fiat', country: 'Italy' },
        { id: 'lancia', name: 'Lancia', country: 'Italy' },
        
        // French
        { id: 'peugeot', name: 'Peugeot', country: 'France' },
        { id: 'renault', name: 'Renault', country: 'France' },
        { id: 'citroen', name: 'Citroën', country: 'France' },
        { id: 'ds', name: 'DS Automobiles', country: 'France' },
        
        // Swedish
        { id: 'volvo', name: 'Volvo', country: 'Sweden' },
        { id: 'koenigsegg', name: 'Koenigsegg', country: 'Sweden' },
        { id: 'scania', name: 'Scania', country: 'Sweden' },
        
        // Spanish
        { id: 'seat', name: 'SEAT', country: 'Spain' },
        { id: 'cupra', name: 'CUPRA', country: 'Spain' },
        
        // Czech
        { id: 'skoda', name: 'Škoda', country: 'Czech Republic' },
        
        // Chinese
        { id: 'byd', name: 'BYD', country: 'China' },
        { id: 'great-wall', name: 'Great Wall', country: 'China' },
        { id: 'haval', name: 'Haval', country: 'China' },
        { id: 'changan', name: 'Changan', country: 'China' },
        { id: 'geely', name: 'Geely', country: 'China' },
        { id: 'mg', name: 'MG', country: 'China' },
        { id: 'roewe', name: 'Roewe', country: 'China' },
        { id: 'lynk', name: 'Lynk & Co', country: 'China' },
        { id: 'nio', name: 'NIO', country: 'China' },
        { id: 'xpeng', name: 'XPeng', country: 'China' },
        { id: 'li-auto', name: 'Li Auto', country: 'China' },
        
        // Pakistani Makes (local assembly and popular imports)
        { id: 'pak-suzuki', name: 'Pak Suzuki', country: 'Pakistan' },
        { id: 'toyota-indus', name: 'Toyota Indus', country: 'Pakistan' },
        { id: 'honda-atlas', name: 'Honda Atlas', country: 'Pakistan' },
        { id: 'nissan-pak', name: 'Ghandhara Nissan', country: 'Pakistan' },
        { id: 'kia-pak', name: 'Kia Lucky Motors', country: 'Pakistan' },
        { id: 'hyundai-pak', name: 'Hyundai Nishat', country: 'Pakistan' },
        { id: 'mg-pak', name: 'MG JW Automobiles', country: 'Pakistan' },
        { id: 'changan-pak', name: 'Changan Master Motors', country: 'Pakistan' },
        { id: 'faw-pak', name: 'FAW Pakistan', country: 'Pakistan' },
        { id: 'haima-pak', name: 'Haima (Regal Automobiles)', country: 'Pakistan' },
        { id: ' proton-pak', name: 'Proton (Al-Haj Automotive)', country: 'Pakistan' },
        { id: 'baic-pak', name: 'BAIC (UNIC)', country: 'Pakistan' },
        { id: 'jac-pak', name: 'JAC Motors (Master Motors)', country: 'Pakistan' },
        { id: 'foton-pak', name: 'Foton (Ghandhara Automobiles)', country: 'Pakistan' },
        { id: 'daimler-pak', name: 'Daimler (Mercedes Pakistan)', country: 'Pakistan' },
        { id: 'bmw-pak', name: 'BMW Pakistan', country: 'Pakistan' },
    ],
    
    models: {
        // BMW models
        'bmw': [
            'M3', 'M5', 'M8', 'X5 M', 'X6 M', 'M4', 'M2', 'M6',
            '3 Series', '5 Series', '7 Series', 'X3', 'X4', 'X5', 'X6',
            'Z4', '8 Series', 'iX', 'i4', 'i8', 'X1', 'X2', 'X7',
            'M1', 'M4 Competition', 'M5 Competition', 'M8 Competition'
        ],
        
        // Pakistani Suzuki models
        'pak-suzuki': [
            'Cultus', 'Wagon R', 'Alto', 'Mehran', 'Every', 'Jimny',
            'Swift', 'Baleno', 'Vitara', 'Grand Vitara', 'BR-V',
            'Fronx', 'S-Presso', 'Ignis', 'Celerio'
        ],
        
        // Toyota Pakistan models
        'toyota-indus': [
            'Corolla', 'Corolla Altis', 'Corolla GR Sport', 'Corolla Cross',
            'Fortuner', 'Prado', 'Land Cruiser', 'Hilux',
            'Camry', 'Yaris', 'Vitz', 'Aqua', 'Prius', 'C-HR',
            'Coaster', 'Dyna', 'Hiace'
        ],
        
        // Honda Pakistan models
        'honda-atlas': [
            'Civic', 'Civic Type R', 'Civic Hybrid', 'Civic X',
            'City', 'City Aspire', 'City Hybrid',
            'Accord', 'CR-V', 'HR-V', 'BR-V', 'Pilot',
            'Fit', 'Jazz', 'Vezel', 'WR-V'
        ],
        
        // Pakistani Nissan
        'nissan-pak': [
            'Sunny', 'Dayz', 'Almera', 'Sentra',
            'Altima', 'Maxima', 'Teana',
            'Patrol', 'Patrol Royale', 'Terra',
            'Urvan', 'NV200', 'Navara', 'Frontier'
        ],
        
        // Pakistani Kia
        'kia-pak': [
            'Sportage', 'Seltos', 'Carnival', 'Sorento',
            'Sonet', 'Picanto', 'Cerato', 'Optima',
            'Stonic', 'Niro', 'Soul', 'Telluride'
        ],
        
        // Pakistani Hyundai
        'hyundai-pak': [
            'Tucson', 'Santa Fe', 'Creta', 'Elantra',
            'Sonata', 'Accent', 'i10', 'i20', 'i30',
            'Kona', 'Venue', 'Palisade', 'Stargazer'
        ],
        
        // Pakistani MG
        'mg-pak': [
            'MG HS', 'MG ZS', 'MG 5', 'MG 3',
            'MG Marvel R', 'MG ZS EV', 'MG Hector', 'MG Comet'
        ],
        
        // Pakistani Changan
        'changan-pak': [
            'Changan Alsvin', 'Changan CS75 Plus', 'Changan CS35 Plus',
            'Changan Lumin', 'Changan UNI-T', 'Changan Oshan X7'
        ],
        
        // Pakistani FAW
        'faw-pak': [
            'FAW V2', 'FAW V5', 'FAW X-PV', 'FAW R180',
            'FAW Bestune T77', 'FAW Bestune T99', 'FAW Senator'
        ],
        
        // Pakistani Proton
        'proton-pak': [
            'Proton X70', 'Proton X90', 'Proton Saga',
            'Proton Persona', 'Proton Iriz', 'Proton Exora'
        ],
        
        // Pakistani BAIC
        'baic-pak': [
            'BAIC D20', 'BAIC X25', 'BAIC X55',
            'BAIC BJ40', 'BAIC BJ80', 'BAIC Foday Landfort'
        ],
        
        // Pakistani JAC
        'jac-pak': [
            'JAC Refine S2', 'JAC Refine S3', 'JAC Refine S4',
            'JAC Refine M3', 'JAC Refine M4', 'JAC J7'
        ],
        
        // More international models
        'ford': [
            'Mustang GT', 'Mustang Shelby GT500', 'Focus ST', 'Fiesta ST',
            'Mustang EcoBoost', 'Raptor', 'Bronco', 'GT', 'F-150 Raptor',
            'Focus RS', 'Mustang Mach-E', 'Mustang Boss 302', 'Explorer ST',
            'Edge ST', 'Transit', 'Transit Connect', 'Ranger', ' Maverick',
            'Escape', 'Fusion', 'Taurus', 'Fusion Hybrid', 'Flex'
        ],
        
        'audi': [
            'RS6', 'RS7', 'RS5', 'RS4', 'RS3', 'R8', 'TT RS', 'SQ5', 'SQ7',
            'A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'S4', 'S6', 'S8', 'S5',
            'e-tron GT', 'RS e-tron GT', 'RS Q8', 'Q8 e-tron',
            'A3', 'A5', 'A7', 'Q3', 'Q4 e-tron', 'TT', 'R8'
        ],
        
        'mercedes': [
            'AMG GT', 'AMG C63', 'AMG E63', 'AMG S63', 'AMG G63', 'AMG GT 63 S',
            'C63 AMG', 'E63 AMG', 'S63 AMG', 'G63 AMG', 'SLS AMG', 'AMG ONE',
            'CLA 45 AMG', 'GLA 45 AMG', 'A45 AMG', 'GT', 'SL', 'SLC',
            'EQS', 'EQA', 'EQB', 'EQC', 'GLE', 'GLS', 'GLB'
        ],
        
        'toyota': [
            'GR Supra', '86', 'GR Yaris', 'Camry TRD', 'Corolla GR',
            'Supra', 'MR2', 'Celica', 'GT86', 'Altezza', 'Aristo',
            'Mark X', 'Noah', 'Vellfire', 'Land Cruiser', '4Runner',
            'Tacoma', 'Tundra', 'Sequoia', 'Highlander', 'RAV4',
            'Prius', 'Camry', 'Corolla', 'Yaris', 'Avalon', 'Sienna'
        ],
        
        'nissan': [
            'GT-R', '370Z', '350Z', '240Z', 'Skyline GT-R', 'Silvia S15',
            'S14', 'S13', '180SX', '240SX', 'Fairlady Z', 'Patrol',
            'Patrol GT-R', 'Primera', 'Stagea', 'Cube', 'Juke',
            'Qashqai', 'X-Trail', 'Pathfinder', 'Armada', 'Titan'
        ],
        
        'honda': [
            'Civic Type R', 'Integra Type R', 'NSX', 'S2000', 'Accord Type R',
            'Prelude', 'CR-Z', 'Element', 'Fit', 'Civic Si',
            'Accord Euro R', 'Inspire', 'Legend', 'Odyssey', 'Pilot',
            'CR-V', 'HR-V', 'WR-V', 'Ridgeline', 'Insight', 'Clarity'
        ],
        
        'chevrolet': [
            'Corvette C8', 'Camaro ZL1', 'Camaro SS', 'Silverado SS', 'Colorado ZR2',
            'Corvette C7', 'Corvette C6', 'Camaro Z/28', 'Chevelle SS', 'Nova',
            'Impala SS', 'Bel Air', 'Monte Carlo', 'El Camino',
            'Tahoe', 'Suburban', 'Equinox', 'Traverse', 'Blazer',
            'Malibu', 'Impala', 'Cruze', 'Sonic', 'Spark'
        ],
        
        // ... (existing model lists remain the same)
        // I'll keep all the existing models but add the new Pakistani makes
        // Full model list continues below...
        'porsche': ['911 Turbo', '911 GT3', '911 GT3 RS', '911 Carrera', '718 Cayman GT4', 'Panamera Turbo', 'Cayenne Turbo', 'Taycan Turbo', 'Boxster', 'Carrera GT', '918 Spyder', '959', 'GT2 RS', 'GT3 RS'],
        'mazda': ['MX-5 Miata', 'RX-7', 'RX-8', 'Mazda3 MPS', 'Mazda6 MPS', 'MX-5 RF', 'RX-7 FD3S', 'RX-7 FC3S', 'Cosmo', 'Lantis', 'RX-8 Type S', 'Mazdaspeed3', 'Mazdaspeed6', 'AXELA'],
        'subaru': ['WRX STI', 'WRX', 'BRZ', 'Legacy GT', 'Outback XT', 'Impreza WRX STI', 'Forester STi', 'Baja', 'SVX', 'Alcyone', 'Legacy B4 Blitzen', 'WRX Wagon', 'Crosstrek Hybrid'],
        'volkswagen': ['Golf GTI', 'Golf R', 'Jetta GLI', 'Arteon R', 'Tiguan R', 'Golf Mk7 R', 'Golf Mk6 R32', 'Beetle RSi', 'Corrado VR6', 'Passat R36', 'Touareg R', 'ID.4 GTX'],
        'alfa-romeo': ['Giulia Quadrifoglio', 'Stelvio Quadrifoglio', '4C', '8C', 'Giulia', 'Stelvio', 'Tonale', 'Brera', 'Spider', 'GT', 'GTV', '159', '147', '156', '166', 'Mito', ' Giulietta'],
        'fiat': ['500 Abarth', 'Punto Abarth', 'Fiat 124 Spider', 'Fiat 500X', '500', 'Panda', 'Punto', 'Bravo', 'Tipo', 'Doblo', 'Sedici', '500e', '124 Spider Abarth', 'X-1/9'],
        'peugeot': ['308 GTi', '508 PSE', '3008 Hybrid', 'RCZ', '208 GTi', '308', '508', '3008', '5008', '2008', 'Partner', 'Boxer', 'RCZ R', '308 GTi by Peugeot Sport', '208 T16'],
        'renault': ['Megane RS', 'Clio RS', 'Captur RS', 'Alpine A110', 'Twingo GT', 'Megane', 'Clio', 'Captur', 'Kadjar', 'Talisman', 'Scenic', 'Zoe', 'Twizy', 'Master', 'Trafic', 'Alpine A110', '5 Turbo'],
        'volvo': ['XC90 T8', 'S60 T8', 'V60 T8', 'XC60 T8', 'C30 T5', '240', '740', '850', 'S60', 'V60', 'XC60', 'XC90', 'C30', 'S40', 'V40', 'V70', 'C70', 'S80', 'V90'],
        'hyundai': ['Veloster N', 'Elantra N', 'Sonata N Line', 'Kona N', 'Palisade', 'Accent', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Venue', 'Ioniq', 'Nexo', 'Genesis G70', 'G80', 'G90'],
        'kia': ['Stinger GT', 'K5 GT', 'Sportage SX-T', 'Telluride', 'Soul EV', 'Optima', 'K5', 'Sportage', 'Sorento', 'Soul', 'Forte', 'Seltos', 'Sorento PHEV', 'Niro EV', 'EV6 GT', 'Stinger', 'Cadenza'],
        'lexus': ['RC F', 'LC 500', 'IS 500', 'GS F', 'LFA', 'RC F', 'LC 500', 'IS', 'ES', 'LS', 'GS', 'RC', 'LC', 'NX', 'RX', 'GX', 'LX', 'UX', 'IS F', 'GS F'],
        'infiniti': ['Q50 Red Sport 400', 'Q60 Red Sport 400', 'QX80', 'G37', 'G35', 'Q50', 'Q60', 'Q70', 'QX50', 'QX55', 'QX60', 'QX80', 'G35', 'G37', 'M35', 'M37', 'M45', 'M56', 'FX35', 'FX37', 'FX50'],
        'acura': ['NSX', 'TLX Type S', 'RDX Type S', 'Integra Type S', 'MDX Type S', 'ILX', 'TLX', 'RDX', 'MDX', 'RLX', 'RL', 'TSX', 'RSX', 'Integra', 'Legend', 'CL', 'NSX-R', 'Type R', 'A-Spec'],
        'tesla': ['Model S Plaid', 'Model 3 Performance', 'Model X Plaid', 'Model Y Performance', 'Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Semi'],
        
        // Additional European
        'dodge': ['Charger', 'Challenger', 'Dart', 'Durango', 'Journey', 'Grand Caravan', 'Ram Van'],
        'chrysler': ['300', 'Pacifica', 'Voyager', 'Crossfire', 'Sebring', 'PT Cruiser'],
        'jeep': ['Wrangler', 'Wrangler Unlimited', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Wagoneer'],
        'cadillac': ['Escalade', 'CTS-V', 'ATS-V', 'CT4-V', 'CT5-V', 'XT5', 'XT6', 'SRX', 'ATS', 'CTS'],
        'buick': ['Enclave', 'Encore', 'Envision', 'Regal', 'LaCrosse', 'Verano', 'Cascada'],
        'gmc': ['Yukon', 'Sierra', 'Canyon', 'Acadia', 'Terrain', 'Denali', 'Hummer EV'],
        'ram': ['1500', '2500', '3500', 'ProMaster', 'ProMaster City', 'TRX'],
        'lincoln': ['Navigator', 'Aviator', 'Corsair', 'MKC', 'MKT', 'Continental', 'MKZ'],
        'bentley': ['Continental GT', 'Flying Spur', 'Bentayga', 'Mulsanne', 'Arnage'],
        'rolls-royce': ['Ghost', 'Phantom', 'Cullinan', 'Dawn', 'Wraith', 'Spectre'],
        'aston-martin': ['DB11', 'DBS Superleggera', 'Vantage', 'DBX', 'Rapide', 'Vanquish'],
        'mclaren': ['720S', '765LT', '570S', '540C', '600LT', 'GT', 'Artura', 'Senna', 'Speedtail'],
        'mini': ['Cooper', 'Cooper S', 'John Cooper Works', 'Countryman', 'Clubman', 'Paceman', 'Roadster', 'Coupe'],
        'ferrari': ['488 Pista', 'F8 Tributo', 'SF90 Stradale', 'Roma', 'Portofino', 'GTC4Lusso', '812 Superfast', 'LaFerrari', 'F12Berlinetta'],
        'lamborghini': ['Aventador', 'Huracán', 'Urus', 'Gallardo', 'Murciélago', 'Countach', 'Diablo', 'Sesto Elemento'],
        'maserati': ['Quattroporte', 'Ghibli', 'Levante', 'Grecale', 'MC20', 'GranTurismo', 'GranCabrio'],
        'pagani': ['Huayra', 'Zonda', 'Zonda Cinque', 'Huayra R', 'Zonda Revolucion'],
        
        // Chinese brands
        'byd': ['Han', 'Tang', 'Song', 'Qin', 'Yuan', 'Seal', 'Dolphin', 'Atto 3', 'Tang DM-p'],
        'great-wall': ['Tank 300', 'Tank 500', 'Haval H6', 'Haval F7', 'Haval Jolion', 'Ora Good Cat', 'Wey VV7'],
        'haval': ['Haval H6', 'Haval H9', 'Haval F7', 'Haval Jolion', 'Haval Daguan', 'Haval Chitu'],
        'changan': ['CS75 Plus', 'CS55 Plus', 'CS35 Plus', 'UNI-T', 'UNI-K', '逸动', '奔奔', 'Lumin'],
        'geely': ['Emgrand', 'Boyue', 'Coolray', 'Tugella', 'Haoyue', 'Icon', 'Xingyue', 'Geometry C'],
        'mg': ['MG4', 'MG5', 'MG ZS', 'MG HS', 'MG Marvel R', 'MG Hector', 'MG Comet', 'MG6'],
        'roewe': ['Roewe RX5', 'Roewe RX5 Max', 'Roewe i5', 'Roewe ei5', 'Roewe Marvel X', 'Roewe 950'],
        'lynk': ['Lynk & Co 01', 'Lynk & Co 02', 'Lynk & Co 03', 'Lynk & Co 05', 'Lynk & Co 06', 'Lynk & Co 09', 'Lynk & Co Z10'],
        'nio': ['NIO ES8', 'NIO ES6', 'NIO EC6', 'NIO ET7', 'NIO ET5', 'NIO EL7', 'NIO EP9'],
        'xpeng': ['XPeng P7', 'XPeng P5', 'XPeng G3', 'XPeng G9', 'XPeng X9'],
        'li-auto': ['Li L9', 'Li L8', 'Li L7', 'Li L6', 'Li Mega'],
        
        // More models for existing makes
        'daihatsu': ['Charade', 'Terios', 'Sirion', 'Ayla', 'Agya', 'Gran Max', 'Hijet'],
        'isuzu': ['D-Max', 'MU-X', 'Faster', 'Trooper', 'Axiom', 'i-Series', 'MU-7'],
        
        // Previous model lists...
        'suzuki': ['Swift', 'Jimny', 'Vitara', 'Grand Vitara', 'Ertiga', 'Ciaz', 'Baleno', 'Ignis', 'S-Presso', 'Wagon R', 'Alto', 'Every', 'Carry', 'Bolan'],
        
        'mitsubishi': ['Lancer Evolution X', 'Lancer Evolution IX', 'Lancer Evolution VIII', 'Eclipse', '3000GT', 'Starion', 'Lancer Ralliart', 'Outlander R', 'Pajero Evolution', 'Galant VR-4', 'FTO', 'Mirage R5', 'ASX', 'Outlander', 'Pajero', 'Montero', 'Triton'],
        
        'genesis': ['G70', 'G80', 'G90', 'GV70', 'GV80', 'GV60', 'G70 Shooting Brake', 'Electrified G80'],
    },
    
    years: Array.from({length: 50}, (_, i) => new Date().getFullYear() - i),
    
    // OBD-II protocols
    obdProtocols: [
        'ISO 15765-4 (CAN)',
        'ISO 14230-4 (KWP)',
        'ISO 9141-2',
        'SAE J1850 VPW',
        'SAE J1850 PWM',
        'ISO 15765-3 (CANS)',
        'ISO 15765-2 (KWP2000)',
        'SAE J1939'
    ],
    
    // OBD-II adapter types
    adapters: [
        { id: 'simulated', name: 'No Adapter - Simulated Data' },
        { id: 'elm327-bt', name: 'ELM327 Bluetooth' },
        { id: 'elm327-wifi', name: 'ELM327 WiFi' },
        { id: 'vcds', name: 'VAG-COM / VCDS' },
        { id: 'torque', name: 'Torque Pro (Android)' },
        { id: 'carista', name: 'Carista OBD2' },
        { id: 'fixd', name: 'FIXD Smart OBD2' },
        { id: 'bluedriver', name: 'BlueDriver' },
        { id: 'obdfusion', name: 'OBD Fusion (iOS)' },
        { id: 'dashcommand', name: 'DashCommand' },
        { id: 'obddoctor', name: 'OBD Doctor' },
        { id: 'other', name: 'Other OBD2 Adapter' }
    ]
};

// Make selection handler
function populateMakes() {
    const makeSelect = document.getElementById('vehicle-make');
    if (!makeSelect) return;
    
    makeSelect.innerHTML = '<option value="">Select Make...</option>';
    
    // Group by country for easier selection
    const grouped = {};
    vehicleDatabase.makes.forEach(make => {
        if (!grouped[make.country]) grouped[make.country] = [];
        grouped[make.country].push(make);
    });
    
    // Add grouped options
    Object.keys(grouped).sort().forEach(country => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = country;
        
        grouped[country].forEach(make => {
            const option = document.createElement('option');
            option.value = make.id;
            option.textContent = make.name;
            optgroup.appendChild(option);
        });
        
        makeSelect.appendChild(optgroup);
    });
}

function populateModels(makeId) {
    const modelSelect = document.getElementById('vehicle-model');
    if (!modelSelect) return;
    
    modelSelect.innerHTML = '<option value="">Select Model...</option>';
    
    if (!makeId || !vehicleDatabase.models[makeId]) {
        modelSelect.disabled = true;
        return;
    }
    
    const models = vehicleDatabase.models[makeId];
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.toLowerCase().replace(/\s+/g, '-');
        option.textContent = model;
        modelSelect.appendChild(option);
    });
    
    modelSelect.disabled = false;
}

function populateYears() {
    const yearSelect = document.getElementById('vehicle-year');
    if (!yearSelect) return;
    
    yearSelect.innerHTML = '<option value="">Select Year...</option>';
    vehicleDatabase.years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    populateMakes();
    populateYears();
    
    const makeSelect = document.getElementById('vehicle-make');
    if (makeSelect) {
        makeSelect.addEventListener('change', function() {
            populateModels(this.value);
        });
    }
    
    // Auto-select BMW M3 for demo if ?demo=bmw in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'bmw') {
        setTimeout(() => {
            makeSelect.value = 'bmw';
            populateModels('bmw');
            setTimeout(() => {
                document.getElementById('vehicle-model').value = 'm3';
                document.getElementById('vehicle-year').value = new Date().getFullYear();
            }, 100);
        }, 500);
    }
});
