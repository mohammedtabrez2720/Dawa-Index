// interactionChecker.js - Fully Bilingual & Dynamic Version
class InteractionChecker {
    constructor() {
        this.selectedDrugs = [];
        this.interactionResults = [];
        this.drugDatabase = window.drugDatabase || [];
        this.interactionDatabase = this.createInteractionDatabase();
        this.init();
    }

    init() {
        this.setupSearch();
        this.setupEventListeners();
        this.updateSelectedDrugsList();
    }

    getLang() {
        return localStorage.getItem('druginfo_lang') || 'en';
    }

    getTranslation(key) {
        return window.languageManager ? window.languageManager.getTranslation(key) : key;
    }

    createInteractionDatabase() {
        return {
            'major': [
                { 
                    drug1: /warfarin/i, drug2: /ibuprofen|naproxen|aspirin/i, 
                    desc_en: 'Increased risk of bleeding', 
                    desc_hi: 'रक्तस्राव का खतरा बढ़ जाता है',
                    rec_en: 'Avoid combination or monitor INR closely', 
                    rec_hi: 'संयोजन से बचें या INR की बारीकी से निगरानी करें'
                },
                { 
                    drug1: /phenelzine|tranylcypromine/i, drug2: /sertraline|escitalopram|fluoxetine/i, 
                    desc_en: 'Risk of serotonin syndrome', 
                    desc_hi: 'सेरोटोनिन सिंड्रोम का खतरा',
                    rec_en: 'Absolutely contraindicated', 
                    rec_hi: 'पूरी तरह से contraindicated'
                },
                { 
                    drug1: /simvastatin|lovastatin/i, drug2: /itraconazole|ketoconazole|clarithromycin/i, 
                    desc_en: 'Risk of rhabdomyolysis', 
                    desc_hi: 'रैबडोमायोलिसिस का खतरा',
                    rec_en: 'Use alternative statin', 
                    rec_hi: 'वैकल्पिक स्टैटिन का उपयोग करें'
                },
                { 
                    drug1: /digoxin/i, drug2: /amiodarone|quinidine/i, 
                    desc_en: 'Increased digoxin toxicity risk', 
                    desc_hi: 'डिगॉक्सिन विषाक्तता का खतरा बढ़ जाता है',
                    rec_en: 'Reduce digoxin dose', 
                    rec_hi: 'डिगॉक्सिन की खुराक कम करें'
                },
                { 
                    drug1: /Sildenafil|Tadalafil|Tamsulosin|Oxybutynin/i, drug2:/Nitroglycerin|Isosorbide Mononitrate/i, 
                    desc_en: 'Causing a sudden and severe drop in blood pressure (hypotension)', 
                    desc_hi: 'अचानक और गंभीर रक्तचाप में गिरावट (हाइपोटेंशन) का कारण बनता है',
                    rec_en: 'Absolutely contraindicated', 
                    rec_hi: 'पूरी तरह से contraindicated'
                }
            ],
            'moderate': [
                { 
                    drug1: /metoprolol|atenolol|propranolol/i, drug2: /verapamil|diltiazem/i, 
                    desc_en: 'Additive bradycardia risk', 
                    desc_hi: 'ब्रैडीकार्डिया का खतरा बढ़ जाता है',
                    rec_en: 'Monitor heart rate', 
                    rec_hi: 'हृदय गति की निगरानी करें'
                },
                { 
                    drug1: /sertraline|escitalopram|fluoxetine/i, drug2: /ibuprofen|naproxen|diclofenac/i, 
                    desc_en: 'Increased bleeding risk', 
                    desc_hi: 'रक्तस्राव का खतरा बढ़ जाता है',
                    rec_en: 'Use with caution', 
                    rec_hi: 'सावधानी के साथ उपयोग करें'
                },
                { 
                    drug1: /lisinopril|enalapril|ramipril/i, drug2: /spironolactone|eplerenone/i, 
                    desc_en: 'Hyperkalemia risk', 
                    desc_hi: 'हाइपरकेलेमिया का खतरा',
                    rec_en: 'Monitor potassium levels', 
                    rec_hi: 'पोटेशियम के स्तर की निगरानी करें'
                }
            ],
            'minor': [
                { 
                    drug1: /metformin/i, drug2: /contrast media/i, 
                    desc_en: 'Lactic acidosis risk', 
                    desc_hi: 'लैक्टिक एसिडोसिस का खतरा',
                    rec_en: 'Hold metformin before procedure', 
                    rec_hi: 'प्रक्रिया से पहले मेटफॉर्मिन रोक दें'
                },
                { 
                    drug1: /theophylline/i, drug2: /ciprofloxacin|clarithromycin/i, 
                    desc_en: 'Increased theophylline levels', 
                    desc_hi: 'थियोफिलाइन का स्तर बढ़ जाता है',
                    rec_en: 'Monitor levels', 
                    rec_hi: 'स्तर की निगरानी करें'
                }
            ]
        };
    }

    setupSearch() {
        const searchInput = document.getElementById('drugSearchInput');
        const searchResults = document.getElementById('searchResults');
        if (!searchInput || !searchResults) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            const results = this.searchDrugs(query);
            this.displaySearchResults(results);
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    searchDrugs(query) {
        return this.drugDatabase.filter(drug => {
            const searchText = [drug.name.toLowerCase(), drug.genericName.toLowerCase(), drug.category.toLowerCase()].join(' ');
            return searchText.includes(query);
        }).slice(0, 10);
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No drugs found</div>';
            searchResults.style.display = 'block';
            return;
        }
        searchResults.innerHTML = results.map(drug => `
            <div class="search-result-item" onclick="window.interactionChecker.addDrug(${drug.id})">
                <div class="drug-info">
                    <strong>${drug.name}</strong>
                    <span class="generic">(${drug.genericName})</span>
                </div>
                <div class="drug-category">${this.formatCategory(drug.category)}</div>
                <button class="btn-add"><i class="fas fa-plus"></i> Add</button>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    }

    setupEventListeners() {
        const checkBtn = document.getElementById('checkInteractionsBtn');
        const clearBtn = document.getElementById('clearAllBtn');
        if (checkBtn) checkBtn.addEventListener('click', () => this.checkInteractions());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearAllDrugs());
    }

    addDrug(drugId) {
        const drug = this.drugDatabase.find(d => d.id === drugId);
        if (!drug) return;
        if (this.selectedDrugs.some(d => d.id === drugId)) {
            this.showNotification(`${drug.name} is already in the list`, 'warning');
            return;
        }
        this.selectedDrugs.push(drug);
        this.updateSelectedDrugsList();
        const searchResults = document.getElementById('searchResults');
        const searchInput = document.getElementById('drugSearchInput');
        if (searchResults) searchResults.style.display = 'none';
        if (searchInput) searchInput.value = '';
        this.showNotification(`Added ${drug.name} to the list`, 'success');
    }

    removeDrug(drugId) {
        this.selectedDrugs = this.selectedDrugs.filter(d => d.id !== drugId);
        this.updateSelectedDrugsList();
        this.clearResults();
    }

    clearAllDrugs() {
        this.selectedDrugs = [];
        this.updateSelectedDrugsList();
        this.clearResults();
        this.showNotification('All drugs cleared', 'info');
    }

    updateSelectedDrugsList() {
        const container = document.getElementById('selectedDrugsContainer');
        const checkBtn = document.getElementById('checkInteractionsBtn');
        const drugCount = document.getElementById('drugCount');
        if (!container) return;
        
        if (this.selectedDrugs.length === 0) {
            container.innerHTML = '<p class="placeholder">No drugs selected. Search and add drugs above.</p>';
            if (checkBtn) checkBtn.disabled = true;
            if (drugCount) drugCount.textContent = '(0)';
            return;
        }

        container.innerHTML = this.selectedDrugs.map(drug => `
            <div class="selected-drug-item">
                <div class="drug-details">
                    <div class="drug-name">${drug.name}</div>
                    <div class="drug-generic">${drug.genericName}</div>
                    <span class="drug-category-badge ${drug.category}">${this.formatCategory(drug.category)}</span>
                </div>
                <button class="btn-remove" onclick="window.interactionChecker.removeDrug(${drug.id})"><i class="fas fa-times"></i></button>
            </div>
        `).join('');

        if (checkBtn) checkBtn.disabled = false;
        if (drugCount) drugCount.textContent = `(${this.selectedDrugs.length})`;
    }

    checkInteractions() {
        if (this.selectedDrugs.length < 2) {
            this.showNotification('Please add at least 2 drugs to check interactions', 'warning');
            return;
        }
        this.interactionResults = [];
        for (let i = 0; i < this.selectedDrugs.length; i++) {
            for (let j = i + 1; j < this.selectedDrugs.length; j++) {
                const drugA = this.selectedDrugs[i];
                const drugB = this.selectedDrugs[j];
                const interactions = this.findInteractions(drugA, drugB);
                if (interactions.length > 0) {
                    this.interactionResults.push({ drugA, drugB, interactions });
                }
            }
        }
        this.displayResults();
    }

    findInteractions(drugA, drugB) {
        const interactions = [];
        for (const [severity, interactionList] of Object.entries(this.interactionDatabase)) {
            for (const interaction of interactionList) {
                const aMatches = this.drugMatchesPattern(drugA, interaction.drug1) && this.drugMatchesPattern(drugB, interaction.drug2);
                const bMatches = this.drugMatchesPattern(drugB, interaction.drug1) && this.drugMatchesPattern(drugA, interaction.drug2);
                if (aMatches || bMatches) {
                    interactions.push({ 
                        severity, 
                        desc_en: interaction.desc_en, 
                        desc_hi: interaction.desc_hi, 
                        rec_en: interaction.rec_en, 
                        rec_hi: interaction.rec_hi 
                    });
                }
            }
        }
        return interactions;
    }

    drugMatchesPattern(drug, pattern) {
        const searchText = drug.name.toLowerCase() + ' ' + drug.genericName.toLowerCase() + ' ' + drug.category.toLowerCase();
        return pattern.test(searchText);
    }

    displayResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        const detailedResults = document.getElementById('detailedResults');
        if (!resultsContainer || !detailedResults) return;
        
        resultsContainer.style.display = 'block';
        this.updateSummary();
        
        const t = (key) => this.getTranslation(key);

        if (this.interactionResults.length === 0) {
            detailedResults.innerHTML = `
                <div class="no-interactions">
                    <i class="fas fa-check-circle"></i>
                    <h4>${t('no_interaction_title')}</h4>
                    <p>${t('no_interaction_desc_drug')}</p>
                    <p class="note">${t('note_consult_doctor')}</p>
                </div>
            `;
        } else {
            detailedResults.innerHTML = this.interactionResults.map(result => this.createInteractionCard(result)).join('');
        }
        this.updateSafetyRecommendations();
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    updateSummary() {
        const t = (key) => this.getTranslation(key);
        let totalInteractions = 0;
        let highestSeverity = 'none';

        this.interactionResults.forEach(result => {
            totalInteractions += result.interactions.length;
            result.interactions.forEach(int => {
                if (int.severity === 'major') highestSeverity = 'major';
                else if (int.severity === 'moderate' && highestSeverity !== 'major') highestSeverity = 'moderate';
                else if (int.severity === 'minor' && highestSeverity === 'none') highestSeverity = 'minor';
            });
        });

        const totalDrugsEl = document.getElementById('totalDrugs');
        const totalInteractionsEl = document.getElementById('totalInteractions');
        const highestSeverityEl = document.getElementById('highestSeverity');
        
        if (totalDrugsEl) totalDrugsEl.textContent = this.selectedDrugs.length;
        if (totalInteractionsEl) totalInteractionsEl.textContent = totalInteractions;
        if (highestSeverityEl) {
            highestSeverityEl.textContent = t(`severity_${highestSeverity}`);
            highestSeverityEl.className = `value severity-${highestSeverity}`;
        }
    }

    createInteractionCard(result) {
        const t = (key) => this.getTranslation(key);
        const lang = this.getLang();

        return `
            <div class="interaction-card">
                <div class="drug-pair">
                    <div class="drug-item">
                        <h5>${result.drugA.name}</h5>
                        <span class="generic">${result.drugA.genericName}</span>
                        <span class="category ${result.drugA.category}">${this.formatCategory(result.drugA.category)}</span>
                    </div>
                    <div class="interaction-symbol"><i class="fas fa-exchange-alt"></i></div>
                    <div class="drug-item">
                        <h5>${result.drugB.name}</h5>
                        <span class="generic">${result.drugB.genericName}</span>
                        <span class="category ${result.drugB.category}">${this.formatCategory(result.drugB.category)}</span>
                    </div>
                </div>
                <div class="interactions-list">
                    ${result.interactions.map(int => {
                        const desc = lang === 'hi' ? int.desc_hi : int.desc_en;
                        const rec = lang === 'hi' ? int.rec_hi : int.rec_en;

                        return `
                        <div class="interaction-item severity-${int.severity}">
                            <div class="severity-indicator">
                                <i class="fas ${this.getSeverityIcon(int.severity)}"></i>
                                <span class="severity-label">${t(int.severity + '_risk')}</span>
                            </div>
                            <div class="interaction-details">
                                <p class="description">${desc}</p>
                                <p class="recommendation"><strong>${t('recommendation_label')}</strong> ${rec}</p>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    updateSafetyRecommendations() {
        const container = document.getElementById('recommendationsList');
        if (!container) return;
        const t = (key) => this.getTranslation(key);
        const recommendations = [];
        
        const hasMajor = this.interactionResults.some(result => result.interactions.some(int => int.severity === 'major'));
        const hasModerate = this.interactionResults.some(result => result.interactions.some(int => int.severity === 'moderate'));

        if (hasMajor) recommendations.push({ icon: 'fas fa-ban', text: t('recommendation_avoid'), type: 'danger' });
        if (hasModerate) recommendations.push({ icon: 'fas fa-exclamation-triangle', text: t('recommendation_caution'), type: 'warning' });
        recommendations.push({ icon: 'fas fa-user-md', text: t('recommendation_inform'), type: 'info' });

        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item ${rec.type}">
                <i class="${rec.icon}"></i><span>${rec.text}</span>
            </div>
        `).join('');
    }

    clearResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) resultsContainer.style.display = 'none';
        this.interactionResults = [];
    }

    formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    getSeverityIcon(severity) {
        const icons = { 'major': 'fa-ban', 'moderate': 'fa-exclamation-triangle', 'minor': 'fa-info-circle' };
        return icons[severity] || 'fa-check-circle';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i><span>${message}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => { notification.classList.add('fade-out'); setTimeout(() => notification.remove(), 300); }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.interactionChecker = new InteractionChecker();
    
    // CRITICAL FIX: This function allows the language switcher to re-render the results dynamically
    window.refreshInteractionResults = function() {
        if (window.interactionChecker && window.interactionChecker.interactionResults.length > 0) {
            window.interactionChecker.displayResults();
        }
    };
});