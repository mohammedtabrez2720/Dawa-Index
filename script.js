// ============================================
// PHARMAINFO - SIMPLIFIED JAVASCRIPT
// One result per drug with required fields only
// ============================================

// Global Variables
const API_BASE_URL = 'https://api.fda.gov/drug/label.json';
const MAX_DRUGS = 12; // Show only 12 drugs max
let drugCache = new Map(); // Cache for deduplication

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('PharmaInfo Initializing...');
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize drug library if on library page
    if (window.location.pathname.includes('library.html')) {
        loadInitialDrugs();
    }
    
    // Initialize auth if needed
    initializeAuth();
    
    console.log('PharmaInfo Ready!');
});

// ============================================
// AUTHENTICATION SYSTEM (Simplified)
// ============================================

function initializeAuth() {
    // Simple auth button handlers
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.textContent.includes('Login')) {
            btn.onclick = function() {
                // Simple demo login
                showNotification('Demo: Login functionality', 'info');
            };
        }
        if (btn.textContent.includes('Register')) {
            btn.onclick = function() {
                // Simple demo register
                showNotification('Demo: Register functionality', 'info');
            };
        }
    });
}

// ============================================
// DRUG SEARCH SYSTEM - SIMPLIFIED
// ============================================

function initializeSearch() {
    const searchInput = document.getElementById('drugSearch');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
        // Search when button clicked
        searchButton.onclick = function() {
            if (searchInput.value.trim()) {
                searchDrugs(searchInput.value.trim());
            }
        };
        
        // Search when Enter key pressed
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                searchDrugs(this.value.trim());
            }
        });
    }
}

async function searchDrugs(searchTerm) {
    console.log('Searching for:', searchTerm);
    
    if (!searchTerm) {
        showNotification('Please enter a drug name', 'error');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    try {
        // Try FDA API first
        const drugs = await fetchDrugFromFDA(searchTerm);
        
        if (drugs.length === 0) {
            // Fallback to local database
            const localDrugs = getDrugsFromLocalDB(searchTerm);
            if (localDrugs.length === 0) {
                showNotification('No drugs found. Try a different search term.', 'warning');
                showNoResults();
            } else {
                showNotification(`Found ${localDrugs.length} drug(s) in local database`, 'info');
                displayDrugs(localDrugs);
            }
        } else {
            showNotification(`Found ${drugs.length} drug(s)`, 'success');
            displayDrugs(drugs);
        }
    } catch (error) {
        console.error('Search error:', error);
        showNotification('Search failed. Using local database.', 'warning');
        
        // Use local database as fallback
        const localDrugs = getDrugsFromLocalDB(searchTerm);
        displayDrugs(localDrugs.length > 0 ? localDrugs : []);
    }
}

async function fetchDrugFromFDA(searchTerm) {
    try {
        // Encode search term for URL
        const encodedTerm = encodeURIComponent(searchTerm);
        
        // Build API URL with multiple search fields
        const apiUrl = `${API_BASE_URL}?search=openfda.brand_name:"${encodedTerm}" OR openfda.generic_name:"${encodedTerm}" OR openfda.substance_name:"${encodedTerm}"&limit=50`;
        
        console.log('Fetching from:', apiUrl);
        
        // Make API request
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            return [];
        }
        
        // Process and deduplicate drugs
        return processFDAandDeduplicate(data.results);
        
    } catch (error) {
        console.error('FDA API error:', error);
        throw error;
    }
}

function processFDAandDeduplicate(apiResults) {
    const uniqueDrugs = new Map();
    
    apiResults.forEach((drug, index) => {
        try {
            // Get the most important identifiers
            const brandName = drug.openfda?.brand_name?.[0] || 'Unknown Brand';
            const genericName = drug.openfda?.generic_name?.[0] || 
                              drug.openfda?.substance_name?.[0] || 
                              'Unknown Generic';
            
            // Create a normalized key for deduplication
            // We use lowercase generic name as the primary deduplication key
            const drugKey = genericName.toLowerCase().trim();
            
            // Skip if we already have this drug
            if (uniqueDrugs.has(drugKey)) {
                console.log(`Skipping duplicate: ${brandName} (${genericName})`);
                return;
            }
            
            // Extract REQUIRED information only
            const processedDrug = {
                id: `drug-${Date.now()}-${index}`,
                name: brandName,
                genericName: genericName,
                // 1. DOSAGE
                dosage: extractDosage(drug),
                // 2. ADVERSE DRUG REACTIONS
                adverseReactions: extractAdverseReactions(drug),
                // 3. SIDE EFFECTS
                sideEffects: extractSideEffects(drug),
                // 4. THERAPEUTIC CATEGORY
                therapeuticCategory: extractTherapeuticCategory(drug),
                // 5. CONTRAINDICATIONS
                contraindications: extractContraindications(drug),
                // 6. DRUG INTERACTIONS
                interactions: extractInteractions(drug),
                // Additional info
                manufacturer: drug.openfda?.manufacturer_name?.[0] || 'Various',
                source: 'US FDA'
            };
            
            // Add to unique drugs
            uniqueDrugs.set(drugKey, processedDrug);
            
            // Stop if we have enough drugs
            if (uniqueDrugs.size >= MAX_DRUGS) {
                throw new Error('Reached max drugs');
            }
            
        } catch (error) {
            // Continue processing other drugs
            console.log('Skipping drug due to error:', error.message);
        }
    });
    
    return Array.from(uniqueDrugs.values());
}

// ============================================
// EXTRACTION FUNCTIONS - SIMPLIFIED
// ============================================

function extractDosage(drug) {
    if (drug.dosage_and_administration?.[0]) {
        const text = drug.dosage_and_administration[0];
        return text.split('.')[0] + '.'; // Get first sentence
    }
    return 'Dosage information not available in label';
}

function extractAdverseReactions(drug) {
    if (drug.adverse_reactions?.[0]) {
        const text = drug.adverse_reactions[0];
        // Get first 3 adverse reactions
        const reactions = text.split(/[.!?]/)
            .slice(0, 3)
            .map(s => s.trim())
            .filter(s => s.length > 0);
        return reactions.length > 0 ? reactions : ['No specific adverse reactions listed'];
    }
    return ['Adverse reactions information not available'];
}

function extractSideEffects(drug) {
    // Common side effects to check for
    const commonEffects = [
        'Nausea', 'Headache', 'Dizziness', 'Fatigue', 'Diarrhea',
        'Vomiting', 'Constipation', 'Rash', 'Insomnia', 'Dry mouth'
    ];
    
    // Check adverse reactions first
    if (drug.adverse_reactions?.[0]) {
        const text = drug.adverse_reactions[0].toLowerCase();
        const found = commonEffects.filter(effect => 
            text.includes(effect.toLowerCase())
        );
        if (found.length > 0) return found.slice(0, 3);
    }
    
    // Check warnings
    if (drug.warnings?.[0]) {
        const text = drug.warnings[0].toLowerCase();
        const found = commonEffects.filter(effect => 
            text.includes(effect.toLowerCase())
        );
        if (found.length > 0) return found.slice(0, 3);
    }
    
    return ['Side effects vary - consult prescribing information'];
}

function extractTherapeuticCategory(drug) {
    // Try to get from FDA classification
    if (drug.openfda?.pharm_class_epc?.[0]) {
        return drug.openfda.pharm_class_epc[0];
    }
    if (drug.openfda?.pharm_class_moa?.[0]) {
        return drug.openfda.pharm_class_moa[0];
    }
    
    // Try to determine from text
    const textToCheck = [
        drug.indications_and_usage?.[0] || '',
        drug.description?.[0] || ''
    ].join(' ').toLowerCase();
    
    // Simple category detection
    if (textToCheck.includes('antibiotic') || textToCheck.includes('antimicrobial')) {
        return 'Antibiotic';
    }
    if (textToCheck.includes('hypertension') || textToCheck.includes('blood pressure')) {
        return 'Cardiovascular';
    }
    if (textToCheck.includes('diabetes') || textToCheck.includes('glucose')) {
        return 'Diabetes';
    }
    if (textToCheck.includes('pain') || textToCheck.includes('analgesic')) {
        return 'Pain Relief';
    }
    if (textToCheck.includes('depression') || textToCheck.includes('anxiety')) {
        return 'Mental Health';
    }
    if (textToCheck.includes('asthma') || textToCheck.includes('respiratory')) {
        return 'Respiratory';
    }
    
    return 'Prescription Medication';
}

function extractContraindications(drug) {
    if (drug.contraindications?.[0]) {
        const text = drug.contraindications[0];
        const points = text.split(/[.!?]/)
            .slice(0, 2)
            .map(s => s.trim())
            .filter(s => s.length > 0);
        return points.length > 0 ? points : ['See prescribing information'];
    }
    return ['Consult prescribing information for contraindications'];
}

function extractInteractions(drug) {
    if (drug.drug_interactions?.[0]) {
        const text = drug.drug_interactions[0];
        const points = text.split(/[.!?]/)
            .slice(0, 2)
            .map(s => s.trim())
            .filter(s => s.length > 0);
        return points.length > 0 ? points : ['Interactions vary - consult pharmacist'];
    }
    return ['Drug interaction information not specified in label'];
}

// ============================================
// LOCAL DATABASE FALLBACK
// ============================================

function getDrugsFromLocalDB(searchTerm) {
    if (!window.drugDatabase || !Array.isArray(window.drugDatabase)) {
        return [];
    }
    
    const searchLower = searchTerm.toLowerCase();
    const uniqueDrugs = new Map();
    
    // Search and deduplicate
    window.drugDatabase.forEach(drug => {
        if (drug.name.toLowerCase().includes(searchLower) || 
            drug.genericName.toLowerCase().includes(searchLower)) {
            
            const key = drug.genericName.toLowerCase();
            
            if (!uniqueDrugs.has(key)) {
                // Transform to match our structure
                uniqueDrugs.set(key, {
                    id: drug.id,
                    name: drug.name,
                    genericName: drug.genericName,
                    dosage: drug.dosage || 'See prescribing information',
                    adverseReactions: drug.sideEffects || ['Information not available'],
                    sideEffects: drug.sideEffects || ['Information not available'],
                    therapeuticCategory: drug.category || 'Unknown',
                    contraindications: drug.contraindications || ['Consult prescribing information'],
                    interactions: drug.interactions || ['Consult interaction database'],
                    manufacturer: 'Various',
                    source: 'Local Database'
                });
            }
            
            // Stop if we have enough
            if (uniqueDrugs.size >= MAX_DRUGS) {
                return;
            }
        }
    });
    
    return Array.from(uniqueDrugs.values()).slice(0, MAX_DRUGS);
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayDrugs(drugs) {
    const drugGrid = document.getElementById('drugGrid');
    if (!drugGrid) return;
    
    // Clear grid
    drugGrid.innerHTML = '';
    
    if (!drugs || drugs.length === 0) {
        showNoResults();
        return;
    }
    
    // Show each drug
    drugs.forEach(drug => {
        const drugCard = createDrugCard(drug);
        drugGrid.appendChild(drugCard);
    });
    
    // Hide loading
    showLoading(false);
}

function createDrugCard(drug) {
    const card = document.createElement('div');
    card.className = 'drug-card';
    
    // Format category for display
    const categoryClass = drug.therapeuticCategory.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    
    card.innerHTML = `
        <div class="drug-card-header">
            <h3>${drug.name}</h3>
            <span class="badge category-${categoryClass}">${drug.therapeuticCategory}</span>
        </div>
        <div class="drug-card-body">
            <div class="drug-basic-info">
                <p><strong>Generic Name:</strong> ${drug.genericName}</p>
                <p><strong>Therapeutic Category:</strong> ${drug.therapeuticCategory}</p>
            </div>
            
            <div class="drug-preview">
                <p><strong>Main Side Effects:</strong></p>
                <ul>
                    ${drug.sideEffects.slice(0, 2).map(effect => 
                        `<li><i class="fas fa-arrow-right"></i> ${effect}</li>`
                    ).join('')}
                </ul>
            </div>
            
            <button class="btn btn-primary view-details-btn" 
                    onclick="showDrugDetails(${JSON.stringify(drug).replace(/"/g, '&quot;')})">
                <i class="fas fa-info-circle"></i> View Complete Details
            </button>
        </div>
        <div class="drug-card-footer">
            <small><em>Source: ${drug.source}</em></small>
        </div>
    `;
    
    return card;
}

function showDrugDetails(drug) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    // Format lists
    const adverseList = drug.adverseReactions.map(item => `<li>${item}</li>`).join('');
    const sideEffectsList = drug.sideEffects.map(item => `<li>${item}</li>`).join('');
    const contraindicationsList = drug.contraindications.map(item => `<li>${item}</li>`).join('');
    const interactionsList = drug.interactions.map(item => `<li>${item}</li>`).join('');
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px; max-height: 80vh; overflow-y: auto;">
            <div class="modal-header">
                <h2><i class="fas fa-pills"></i> ${drug.name}</h2>
                <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
            </div>
            
            <div class="modal-body">
                <!-- 1. Dosage -->
                <div class="detail-section">
                    <h3><i class="fas fa-prescription"></i> Dosage</h3>
                    <p>${drug.dosage}</p>
                </div>
                
                <!-- 2. Adverse Drug Reactions -->
                <div class="detail-section">
                    <h3><i class="fas fa-exclamation-triangle"></i> Adverse Drug Reactions</h3>
                    <ul class="details-list">
                        ${adverseList}
                    </ul>
                </div>
                
                <!-- 3. Side Effects -->
                <div class="detail-section">
                    <h3><i class="fas fa-notes-medical"></i> Common Side Effects</h3>
                    <ul class="details-list">
                        ${sideEffectsList}
                    </ul>
                </div>
                
                <!-- 4. Therapeutic Category -->
                <div class="detail-section">
                    <h3><i class="fas fa-tags"></i> Therapeutic Category</h3>
                    <p>${drug.therapeuticCategory}</p>
                    <p><small>Generic Name: ${drug.genericName}</small></p>
                </div>
                
                <!-- 5. Contraindications -->
                <div class="detail-section">
                    <h3><i class="fas fa-ban"></i> Contraindications</h3>
                    <ul class="details-list">
                        ${contraindicationsList}
                    </ul>
                </div>
                
                <!-- 6. Drug Interactions -->
                <div class="detail-section">
                    <h3><i class="fas fa-exchange-alt"></i> Drug Interactions</h3>
                    <ul class="details-list">
                        ${interactionsList}
                    </ul>
                </div>
                
                <div class="disclaimer">
                    <p><i class="fas fa-exclamation-circle"></i> <strong>Important:</strong> This information is for educational purposes only. Always consult a healthcare provider.</p>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.style.display='none'">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ============================================
// INITIAL DRUG LOADING
// ============================================

function loadInitialDrugs() {
    const drugGrid = document.getElementById('drugGrid');
    if (!drugGrid) return;
    
    // Show loading
    drugGrid.innerHTML = `
        <div class="loading" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <i class="fas fa-spinner fa-spin"></i> Loading drug library...
        </div>
    `;
    
    // Load some common drugs
    setTimeout(() => {
        if (window.drugDatabase && window.drugDatabase.length > 0) {
            // Get unique drugs from local database
            const uniqueDrugs = getUniqueDrugsFromLocal();
            displayDrugs(uniqueDrugs.slice(0, 8));
        } else {
            // Try to fetch from FDA
            fetchDrugFromFDA('aspirin')
                .then(drugs => {
                    if (drugs.length > 0) {
                        displayDrugs(drugs.slice(0, 8));
                    } else {
                        showNoResults();
                    }
                })
                .catch(() => showNoResults());
        }
    }, 500);
}

function getUniqueDrugsFromLocal() {
    if (!window.drugDatabase) return [];
    
    const uniqueDrugs = new Map();
    
    window.drugDatabase.forEach(drug => {
        const key = drug.genericName.toLowerCase();
        if (!uniqueDrugs.has(key)) {
            uniqueDrugs.set(key, {
                id: drug.id,
                name: drug.name,
                genericName: drug.genericName,
                dosage: drug.dosage || 'See prescribing information',
                adverseReactions: drug.sideEffects || ['Information not available'],
                sideEffects: drug.sideEffects || ['Information not available'],
                therapeuticCategory: drug.category || 'Unknown',
                contraindications: drug.contraindications || ['Consult prescribing information'],
                interactions: drug.interactions || ['Consult interaction database'],
                manufacturer: 'Various',
                source: 'Local Database'
            });
        }
    });
    
    return Array.from(uniqueDrugs.values());
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showLoading(show = true) {
    const drugGrid = document.getElementById('drugGrid');
    if (!drugGrid) return;
    
    if (show) {
        drugGrid.innerHTML = `
            <div class="loading" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-spinner fa-spin"></i> Searching...
            </div>
        `;
    }
}

function showNoResults() {
    const drugGrid = document.getElementById('drugGrid');
    if (!drugGrid) return;
    
    drugGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
            <h3>No Drugs Found</h3>
            <p>Try searching for a different medication</p>
        </div>
    `;
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    
    notification.innerHTML = `
        <span>${icon} ${message}</span>
        <button onclick="this.parentElement.remove()" style="margin-left: auto; background: none; border: none; color: inherit;">×</button>
    `;
    
    // Add styles if needed
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 16px;
                border-radius: 4px;
                color: white;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 8px;
                min-width: 250px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
            .notification-info { background: #2a5a7c; }
            .notification-success { background: #28a745; }
            .notification-error { background: #dc3545; }
            .notification-warning { background: #ffc107; color: #000; }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// ============================================
// GLOBAL FUNCTIONS
// ============================================

// Make functions available globally
window.searchDrug = function() {
    const searchInput = document.getElementById('drugSearch');
    if (searchInput && searchInput.value.trim()) {
        searchDrugs(searchInput.value.trim());
    }
};

window.showDrugDetails = showDrugDetails;
window.showDrugDetailsFromJSON = function(jsonString) {
    try {
        const drug = JSON.parse(jsonString);
        showDrugDetails(drug);
    } catch (e) {
        showNotification('Error showing details', 'error');
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('PharmaInfo initialized');
    });
} else {
    console.log('PharmaInfo already loaded');
}

