// language.js - Bilingual Support System
const translations = {
    en: {
        // Common Elements
        'app_name': 'Dawa Index', 'home': 'Home', 'drug_library': 'Drug Library', 'interactions': 'Interactions',
        'advisory': 'Advisory', 'about': 'About', 'login': 'Login', 'what_we_offer': 'What We Offer',
        'welcome_message': 'Your Comprehensive Drug Information Resource',
        'welcome_subtitle': 'Find detailed information about medications, side effects, contraindications, and drug interactions',
        'side_effects': 'Side Effects', 'contraindications': 'Contraindications', 'drug_interactions': 'Drug Interactions',
        'browse_drugs': 'Browse our comprehensive database of medications', 'view_details': 'View Complete Details',
        'interaction_checker': 'Drug Interaction Checker',
        'interaction_subtitle': 'Check for potential interactions between medications, supplements, and health conditions',
        'search_placeholder_interaction': 'Search by drug name (e.g., Ibuprofen, Warfarin, Sertraline)...',
        'selected_medications': 'Selected Medications', 'check_interactions': 'Check for Interactions', 'clear_all': 'Clear All',
        'interaction_results': 'Interaction Report', 'about_title': 'About Dawa Index', 'our_vision': 'Our Vision',
        'our_mission': 'Our Mission', 'core_values': 'Our Core Values', 'developer': 'About the Developer',
        'disclaimer': 'Disclaimer', 'footer_desc': 'Your trusted source for comprehensive drug information',
        'quick_links': 'Quick Links', 'contact_us': 'Contact Us', 'all_rights_reserved': 'All rights reserved',
        'login_title': 'Login to Your Account', 'email': 'Email Address', 'password': 'Password',

       //Home Page
       'contraindications_desc' : 'Learn about conditions where specific medications should not be used',
       'side_effects_desc' : 'Comprehensive information on potential side effects of medications',
       'drug_interactions_desc' : 'Check interactions between different medications', 
       'drug_library_desc' : 'Access our extensive database of medication information', 
       
        // About Page
        'about_subtitle': 'Empowering knowledge for safer and informed medication use',
        'vision_desc': 'To become a trusted digital platform that provides accurate, accessible, and up-to-date drug information, helping students, healthcare professionals, and the public make informed decisions about medication use.',
        'mission_desc': 'Our mission is to simplify complex drug-related information by presenting it in a clear, structured, and user-friendly manner. We aim to support safe medication practices through education and awareness.',
        'why_druginfo': 'Why Dawa Index?',
        'why_desc': 'With the growing use of medicines worldwide, access to reliable drug information is essential. DrugInfo is designed as an educational resource that brings together drug indications, side effects, contraindications, and interactions in one place.',
        'accuracy': 'Accuracy', 'accuracy_desc': 'We prioritize correctness and evidence-based drug information.',
        'safety': 'Safety', 'safety_desc': 'Promoting safe and responsible use of medications.',
        'education': 'Education', 'education_desc': 'Supporting learning for pharmacy, medical, and life science students.',
        'accessibility': 'Accessibility', 'accessibility_desc': 'Making drug information easy to understand and widely accessible.',
        'developer_name': 'Ansari Mohammed Tabrez Wasiullah',
        'founder': 'Founder & Developer — Dawa Index',
        'developer_bio1': 'I am a passionate developer with a strong interest in healthcare technology and pharmaceutical education. DAWA INDEX was created as an academic and practical project to bridge the gap between complex drug information and easy public understanding.',
        'developer_bio2': 'My goal is to build digital tools that support safe medication use, improve awareness, and assist students and healthcare professionals through structured and reliable drug information systems.',
        'contact_field': 'Healthcare & Web Technology',
        'contact_location': 'Malegaon, Maharashtra, (India)',
        'disclaimer_full_text': 'Dawa Index is an educational platform and does not replace professional medical advice. Always consult a qualified healthcare professional before starting, stopping, or changing any medication.',

        // Advisory Page
        'public_health_advisory': 'PUBLIC HEALTH ADVISORY', 'nimesulide_ban_title': 'Nimesulide Ban Status in India',
        'regulatory_status': 'Regulatory Status:', 'nationwide_restrictions': 'Subject to Nationwide Restrictions',
        'children_under_12': 'Children Under 12', 'high_dose_formulations': 'High-Dose Formulations',
        'veterinary_use': 'Veterinary Use', 'compliance_action': 'Immediate Compliance Action Required:',
        'children_under_12_desc' : 'Manufacture, sale, and distribution strictly prohibited. This age group is highly susceptible to Nimesulide-induced hepatotoxicity (severe liver damage)',
        'high_dose_desc' : 'All oral formulations containing more than 100 mg of Nimesulide are prohibited with immediate effect due to increased health risks.',
        'veterinary_desc' : 'Officially banned nationwide to prevent lethal renal failure in endangered vultures that scavenge on treated livestock carcasses.',
        'compliance_desc' : 'All pharmacies, retailers, and hospitals must remove banned higher-dose formulations (>100 mg) and pediatric formulations from shelves and return them to suppliers.',

        //Drug-Drug Page
        'check_drug_interactions' : 'Check Drug Interactions', 

        // Drug-Food Page
        'drug_food_title': 'Drug-Food Interaction Checker',
        'drug_food_subtitle': 'Check for potential interactions between your medications and common foods.',
        'check_food_interactions': 'Check Drug-Food Interactions', 'select_drug': 'Select Medication',
        'select_drug_placeholder': '-- Select a Drug --', 'select_food': 'Select Food / Beverage',
        'select_food_placeholder': '-- Select Food/Beverage --',
        
        // Drug-Herb Page
        'drug_herb_title': 'Drug-Herb Interaction Checker',
        'drug_herb_subtitle': 'Check for potential interactions between your medications and herbal supplements.',
        'check_herb_interactions': 'Check Drug-Herb Interactions', 'select_herb': 'Select Herbal Supplement',
        'select_herb_placeholder': '-- Select a Herb --',

        // Interaction Results (Dynamic)
        'medication_label': 'Medication', 'food_label': 'Food/Beverage', 'herb_label': 'Herbal Supplement',
        'major_risk': 'MAJOR RISK', 'moderate_risk': 'MODERATE RISK', 'minor_risk': 'MINOR RISK',
        'recommendation_label': 'Recommendation:', 'no_interaction_title': 'No Significant Interaction Found',
        'no_interaction_desc_food': 'No known major interactions were detected between the selected drug and food.',
        'no_interaction_desc_herb': 'No known major interactions were detected between the selected drug and herb.',
        'consult_doctor_note': 'Note: Always consult your healthcare provider regarding your diet and medications.',
        
        // Drug-Drug Summary & Results
        'summary': 'Summary', 'total_drugs': 'Total Drugs:', 'interactions_found': 'Interactions Found:',
        'highest_severity': 'Highest Severity:', 'severity_major': 'Major (High Risk)',
        'severity_moderate': 'Moderate (Caution)', 'severity_minor': 'Minor (Monitor)', 'severity_none': 'None',
        'no_interaction_desc_drug': 'No major interactions were detected between the selected drugs.',
        'note_consult_doctor': 'Note: Always consult your healthcare provider.',
        'safety_recommendations': 'Safety Recommendations',
        'recommendation_avoid': 'Avoid combination - consult healthcare provider immediately',
        'recommendation_caution': 'Use with caution - monitor for side effects',
        'recommendation_inform': 'Always inform your doctor about all medications',
        
        // How It Works
        'how_it_works': 'How Our Interaction Checker Works',
        'search_add_drugs': 'Search & Add Drugs',
        'search_add_desc': 'Search for drugs by brand name or generic name from our comprehensive database',
        'intelligent_analysis': 'Intelligent Analysis',
        'intelligent_analysis_desc': 'Our system analyzes pharmacological properties and known interactions',
        'risk_assessment': 'Risk Assessment',
        'risk_assessment_desc': 'Identifies potential risks and provides severity ratings for each interaction',
        'safety_recommendations_heading': 'Safety Recommendations',
        'safety_recommendations_desc': 'Provides actionable recommendations based on interaction severity',

        //Dawa AI
        'dawa_ai': 'Dawa AI',
'dawa_ai_subtitle': 'Your intelligent medicine-information assistant',
'coming_soon': '🚧 Coming Soon — Currently Under Development',
'vision_title': 'Our Vision for Dawa AI',
'vision_body': 'Dawa AI will be a source-grounded medicine information assistant. Every answer will be traced to Dawa Index data and openFDA sources — never invented. It will help users understand pharmaceutical information safely and transparently.',
'pillar_grounded': 'Source-Grounded Answers',
'pillar_grounded_desc': 'Every answer will show its source — Dawa Index database or openFDA. No guessing, no hallucination.',
'pillar_safety': 'Safety First',
'pillar_safety_desc': 'Dawa AI will never diagnose, prescribe, or recommend starting or stopping any medicine.',
'pillar_bilingual': 'Bilingual Support',
'pillar_bilingual_desc': 'Explanations available in English and Hindi, with Marathi planned for the future.',
'pillar_transparency': 'Full Transparency',
'pillar_transparency_desc': 'A "Why this answer?" button will show exactly what information was used.',
'planned_features': 'Planned Features',
'feat_ask': 'Ask About Any Medicine',
'feat_ask_desc': 'Type a question like "What is Atorvastatin?" and receive a clear, sourced explanation.',
'feat_simple': 'Simple & Professional Modes',
'feat_simple_desc': 'Choose plain-language explanations or structured professional information.',
'feat_source': 'Automatic Source Attribution',
'feat_source_desc': 'Every answer will display where its information came from with a timestamp.',
'feat_safety': 'Medical Safety Guardrails',
'feat_safety_desc': 'Clinical advice requests will be redirected to qualified healthcare professionals.',
'feat_feedback': 'Feedback & Reporting',
'feat_feedback_desc': 'Users can rate answers and report incorrect or outdated information.',
'feat_ask_button': '"Ask Dawa AI" on Drug Pages',
'feat_ask_button_desc': 'A button on every drug card to start a Dawa AI conversation about that medicine.',
'stay_tuned': 'Stay Tuned',
'stay_tuned_body': 'Dawa AI is actively being developed as part of the Dawa Index platform. For updates, suggestions, or collaboration, feel free to contact us.',
    },
    
    hi: {
        // Common Elements
        'app_name': 'दवा इंडेक्स', 'home': 'होम', 'drug_library': 'दवाओं की सूची', 'interactions': 'दवा इंटरेक्शन',
        'advisory': 'परामर्शी', 'about': 'हमारे बारे में', 'login': 'लॉगिन', 'what_we_offer': 'हमारी पेशकश',
        'welcome_message': 'आपका व्यापक दवा जानकारी संसाधन',
        'welcome_subtitle': 'दवाओं, साइड इफेक्ट्स, कंट्राइंडिकेशन और दवा इंटरेक्शन के बारे में विस्तृत जानकारी प्राप्त करें',
        'side_effects': 'साइड इफेक्ट्स', 'contraindications': 'कंट्राइंडिकेशन', 'drug_interactions': 'दवा इंटरेक्शन',
        'browse_drugs': 'दवाओं के हमारे व्यापक डेटाबेस को ब्राउज़ करें', 'view_details': 'पूरी जानकारी देखें',
        'interaction_checker': 'दवा इंटरेक्शन चेकर',
        'interaction_subtitle': 'दवाओं, सप्लीमेंट्स और स्वास्थ्य स्थितियों के बीच संभावित इंटरेक्शन की जाँच करें',
        'search_placeholder_interaction': 'दवा के नाम से खोजें (जैसे, आइबुप्रोफेन, वारफारिन, सर्ट्रालाइन)...',
        'selected_medications': 'चयनित दवाएँ', 'check_interactions': 'इंटरेक्शन की जाँच करें', 'clear_all': 'सभी साफ करें',
        'interaction_results': 'इंटरेक्शन रिपोर्ट', 'about_title': 'दवा इंडेक्स के बारे में', 'our_vision': 'हमारी दृष्टि',
        'our_mission': 'हमारा मिशन', 'core_values': 'हमारे मूल मूल्य', 'developer': 'डेवलपर के बारे में',
        'disclaimer': 'अस्वीकरण', 'footer_desc': 'व्यापक दवा जानकारी के लिए आपका विश्वसनीय स्रोत',
        'quick_links': 'त्वरित लिंक', 'contact_us': 'संपर्क करें', 'all_rights_reserved': 'सर्वाधिकार सुरक्षित',
        'login_title': 'अपने अकाउंट में लॉगिन करें', 'email': 'ईमेल पता', 'password': 'पासवर्ड',

        //Home Page
       'contraindications_desc' : 'ऐसी स्थितियों के बारे में जानें जिनमें कुछ खास दवाएं इस्तेमाल नहीं की जानी चाहिए।',
       'side_effects_desc' : 'दवाओं के संभावित साइड इफ़ेक्ट्स के बारे में पूरी जानकारी', 
       'drug_interactions_desc' : 'अलग-अलग दवाओं के बीच होने वाली प्रतिक्रियाओं की जाँच करें।',
       'drug_library_desc' : 'दवाओं की जानकारी वाले हमारे व्यापक डेटाबेस तक पहुँचें।',


        // About Page - Full Translations
        'about_subtitle': 'सुरक्षित और सूचित दवा उपयोग के लिए ज्ञान को सशक्त बनाना',
        'vision_desc': 'एक विश्वसनीय डिजिटल प्लेटफॉर्म बनना जो सटीक, सुलभ और अद्यतित दवा जानकारी प्रदान करता है, जिससे छात्रों, स्वास्थ्य पेशेवरों और जनता को दवा उपयोग के बारे में सूचित निर्णय लेने में मदद मिलती है।',
        'mission_desc': 'हमारा मिशन जटिल दवा-संबंधी जानकारी को स्पष्ट, संरचित और उपयोगकर्ता-अनुकूल तरीके से प्रस्तुत करके सरल बनाना है। हम शिक्षा और जागरूकता के माध्यम से सुरक्षित दवा प्रथाओं का समर्थन करना चाहते हैं।',
        'why_druginfo': 'दवा इंडेक्स क्यों?',
        'why_desc': 'दुनिया भर में दवाओं के बढ़ते उपयोग के साथ, विश्वसनीय दवा जानकारी तक पहुँच आवश्यक है। Dawa Index को एक शैक्षिक संसाधन के रूप में डिज़ाइन किया गया है जो दवा संकेतों, दुष्प्रभावों, contraindications और इंटरैक्शन को एक स्थान पर एक साथ लाता है।',
        'accuracy': 'सटीकता', 'accuracy_desc': 'हम सटीकता और साक्ष्य-आधारित दवा जानकारी को प्राथमिकता देते हैं।',
        'safety': 'सुरक्षा', 'safety_desc': 'दवाओं के सुरक्षित और जिम्मेदार उपयोग को बढ़ावा देना।',
        'education': 'शिक्षा', 'education_desc': 'फार्मेसी, मेडिकल और लाइफ साइंस के छात्रों के लिए सीखने का समर्थन करना।',
        'accessibility': 'सुलभता', 'accessibility_desc': 'दवा जानकारी को समझने में आसान और व्यापक रूप से सुलभ बनाना।',
        'developer_name': 'अन्सारी मोहम्मद तबरेज वसीउल्लाह',
        'founder': 'संस्थापक और डेवलपर — दवा इंडेक्स',
        'developer_bio1': 'मैं एक उत्साही डेवलपर हूं जिसकी स्वास्थ्य देखभाल प्रौद्योगिकी और फार्मास्युटिकल शिक्षा में गहरी रुचि है। दवा इंडेक्स को जटिल दवा जानकारी और आसान सार्वजनिक समझ के बीच की खाई को पाटने के लिए एक शैक्षिक और व्यावहारिक परियोजना के रूप में बनाया गया था।',
        'developer_bio2': 'मेरा लक्ष्य डिजिटल टूल्स बनाना है जो सुरक्षित दवा उपयोग का समर्थन करते हैं, जागरूकता बढ़ाते हैं, और छात्रों और स्वास्थ्य पेशेवरों को संरचित और विश्वसनीय दवा सूचना प्रणालियों के माध्यम से सहायता करते हैं।',
        'contact_field': 'स्वास्थ्य और वेब प्रौद्योगिकी',
        'contact_location': 'मालेगांव, महाराष्ट्र, (भारत)',
        'disclaimer_full_text': 'दवा इंडेक्स एक शैक्षिक मंच है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। किसी भी दवा को शुरू करने, बंद करने या बदलने से पहले हमेशा एक योग्य स्वास्थ्य देखभाल पेशेवर से परामर्श लें।',

        // Advisory Page
        'public_health_advisory': 'सार्वजनिक स्वास्थ्य परामर्श', 'nimesulide_ban_title': 'भारत में निमेसुलाइड प्रतिबंध की स्थिति',
        'regulatory_status': 'नियामक स्थिति:', 'nationwide_restrictions': 'राष्ट्रव्यापी प्रतिबंधों के अधीन',
        'children_under_12': '12 वर्ष से कम उम्र के बच्चे', 'high_dose_formulations': 'उच्च खुराक फॉर्मूलेशन',
        'veterinary_use': 'पशु चिकित्सा उपयोग', 'compliance_action': 'तत्काल अनुपालन कार्रवाई आवश्यक:',
        'children_under_12_desc' : 'इसके निर्माण, बिक्री और वितरण पर सख़्त रोक है। इस उम्र के लोगों में निमेसुलाइड (Nimesulide) की वजह से हेपेटोटॉक्सिसिटी (लिवर को गंभीर नुकसान) होने का खतरा बहुत ज़्यादा होता है।',
        'high_dose_desc' : 'स्वास्थ्य संबंधी बढ़ते जोखिमों के कारण, 100 मिलीग्राम से ज़्यादा निमेसुलाइड (Nimesulide) वाली सभी ओरल दवाओं (मुंह से ली जाने वाली दवाओं) पर तत्काल प्रभाव से रोक लगा दी गई है',
        'veterinary_desc' : 'खतरे में पड़ी उन गिद्धों में जानलेवा किडनी फेलियर को रोकने के लिए देश भर में आधिकारिक तौर पर प्रतिबंध लगा दिया गया है, जो दवा-युक्त मवेशियों के शव खाते हैं।',
        'compliance_desc' : 'सभी फ़ार्मेसी, रिटेलर और अस्पतालों को ज़्यादा डोज़ वाले (100 mg से ज़्यादा) और बच्चों के लिए बनाए गए प्रतिबंधित फ़ॉर्मूलेशन को शेल्फ़ से हटाकर सप्लायर को वापस करना होगा।',

        //Drug-Drug Page
        'check_drug_interactions' : 'दवाओं के आपसी असर की जाँच करें',

        // Drug-Food Page
        'drug_food_title': 'दवा-आहार इंटरेक्शन चेकर',
        'drug_food_subtitle': 'अपनी दवाओं और सामान्य खाद्य पदार्थों के बीच संभावित इंटरेक्शन की जाँच करें।',
        'check_food_interactions': 'दवा-आहार इंटरेक्शन की जाँच करें', 'select_drug': 'दवा चुनें',
        'select_drug_placeholder': '-- दवा चुनें --', 'select_food': 'भोजन / पेय चुनें',
        'select_food_placeholder': '-- भोजन/पेय चुनें --',
        
        // Drug-Herb Page
        'drug_herb_title': 'दवा-हर्बल इंटरेक्शन चेकर',
        'drug_herb_subtitle': 'अपनी दवाओं और हर्बल सप्लीमेंट्स के बीच संभावित इंटरेक्शन की जाँच करें।',
        'check_herb_interactions': 'दवा-हर्बल इंटरेक्शन की जाँच करें', 'select_herb': 'हर्बल सप्लीमेंट चुनें',
        'select_herb_placeholder': '-- हर्बल चुनें --',

        // Interaction Results (Dynamic)
        'medication_label': 'दवा', 'food_label': 'भोजन/पेय', 'herb_label': 'हर्बल सप्लीमेंट',
        'major_risk': 'गंभीर जोखिम', 'moderate_risk': 'मध्यम जोखिम', 'minor_risk': 'मामूली जोखिम',
        'recommendation_label': 'सिफारिश:', 'no_interaction_title': 'कोई महत्वपूर्ण इंटरेक्शन नहीं मिला',
        'no_interaction_desc_food': 'चयनित दवा और भोजन के बीच कोई ज्ञात प्रमुख इंटरेक्शन नहीं पाया गया।',
        'no_interaction_desc_herb': 'चयनित दवा और हर्बल के बीच कोई ज्ञात प्रमुख इंटरेक्शन नहीं पाया गया।',
        'consult_doctor_note': 'नोट: अपने आहार और दवाओं के संबंध में हमेशा अपने स्वास्थ्य सेवा प्रदाता से परामर्श लें।',
        
        // Drug-Drug Summary & Results
        'summary': 'सारांश', 'total_drugs': 'कुल दवाएं:', 'interactions_found': 'पाए गए इंटरेक्शन:',
        'highest_severity': 'उच्चतम गंभीरता:', 'severity_major': 'गंभीर (उच्च जोखिम)',
        'severity_moderate': 'मध्यम (सावधानी)', 'severity_minor': 'मामूली (निगरानी)', 'severity_none': 'कोई नहीं',
        'no_interaction_desc_drug': 'चयनित दवाओं के बीच कोई बड़ा इंटरेक्शन नहीं पाया गया।',
        'note_consult_doctor': 'नोट: हमेशा अपने स्वास्थ्य सेवा प्रदाता से परामर्श लें।',
        'safety_recommendations': 'सुरक्षा सिफारिशें',
        'recommendation_avoid': 'संयोजन से बचें - तुरंत स्वास्थ्य सेवा प्रदाता से परामर्श लें',
        'recommendation_caution': 'सावधानी के साथ उपयोग करें - दुष्प्रभावों की निगरानी करें',
        'recommendation_inform': 'अपने डॉक्टर को सभी दवाओं के बारे में हमेशा सूचित करें',
        
        // How It Works
        'how_it_works': 'हमारा इंटरैक्शन चेकर कैसे काम करता है',
        'search_add_drugs': 'दवाएं खोजें और जोड़ें',
        'search_add_desc': 'हमारे व्यापक डेटाबेस से ब्रांड नाम या जेनेरिक नाम द्वारा दवाएं खोजें',
        'intelligent_analysis': 'बुद्धिमान विश्लेषण',
        'intelligent_analysis_desc': 'हमारी प्रणाली औषधीय गुणों और ज्ञात इंटरैक्शन का विश्लेषण करती है',
        'risk_assessment': 'जोखिम मूल्यांकन',
        'risk_assessment_desc': 'संभावित जोखिमों की पहचान करता है और प्रत्येक इंटरैक्शन के लिए गंभीरता रेटिंग प्रदान करता है',
        'safety_recommendations_heading': 'सुरक्षा सुझाव',
        'safety_recommendations_desc': 'इंटरैक्शन की गंभीरता के आधार पर कार्रवाई योग्य सिफारिशें प्रदान करता है',

        //Dawa AI
        'dawa_ai': 'दवा एआई',
'dawa_ai_subtitle': 'आपका बुद्धिमान दवा-सूचना सहायक',
'coming_soon': '🚧 जल्द आ रहा है — वर्तमान में विकास के अधीन',
'vision_title': 'दवा एआई के लिए हमारी दृष्टि',
'vision_body': 'दवा एआई एक स्रोत-आधारित दवा सूचना सहायक होगा। प्रत्येक उत्तर दवा इंडेक्स डेटा और ओपनएफडीए स्रोतों से जुड़ा होगा — कभी गढ़ा नहीं जाएगा। यह उपयोगकर्ताओं को दवा जानकारी को सुरक्षित और पारदर्शी तरीके से समझने में मदद करेगा।',
'pillar_grounded': 'स्रोत-आधारित उत्तर',
'pillar_grounded_desc': 'प्रत्येक उत्तर अपना स्रोत दिखाएगा — दवा इंडेक्स डेटाबेस या ओपनएफडीए। कोई अनुमान नहीं, कोई भ्रम नहीं।',
'pillar_safety': 'सुरक्षा पहले',
'pillar_safety_desc': 'दवा एआई कभी निदान, नुस्खा या किसी दवा को शुरू या बंद करने की सिफारिश नहीं करेगा।',
'pillar_bilingual': 'द्विभाषी समर्थन',
'pillar_bilingual_desc': 'अंग्रेजी और हिंदी में व्याख्या उपलब्ध, भविष्य में मराठी की योजना।',
'pillar_transparency': 'पूर्ण पारदर्शिता',
'pillar_transparency_desc': '"यह उत्तर क्यों?" बटन दिखाएगा कि कौन सी जानकारी उपयोग की गई।',
'planned_features': 'नियोजित सुविधाएं',
'feat_ask': 'किसी भी दवा के बारे में पूछें',
'feat_ask_desc': '"एटोरवास्टेटिन क्या है?" जैसा प्रश्न टाइप करें और स्पष्ट, स्रोत-आधारित व्याख्या प्राप्त करें।',
'feat_simple': 'सरल और पेशेवर मोड',
'feat_simple_desc': 'सरल भाषा में व्याख्या या संरचित पेशेवर जानकारी चुनें।',
'feat_source': 'स्वचालित स्रोत एट्रिब्यूशन',
'feat_source_desc': 'प्रत्येक उत्तर दिखाएगा कि इसकी जानकारी कहां से आई है, टाइमस्टैम्प के साथ।',
'feat_safety': 'चिकित्सा सुरक्षा गार्डरेल',
'feat_safety_desc': 'नैदानिक सलाह के अनुरोध योग्य स्वास्थ्य पेशेवरों को भेजे जाएंगे।',
'feat_feedback': 'प्रतिक्रिया और रिपोर्टिंग',
'feat_feedback_desc': 'उपयोगकर्ता उत्तरों को रेट कर सकते हैं और गलत या पुरानी जानकारी की रिपोर्ट कर सकते हैं।',
'feat_ask_button': 'दवा पृष्ठों पर "दवा एआई से पूछें"',
'feat_ask_button_desc': 'प्रत्येक दवा कार्ड पर उस दवा के बारे में दवा एआई बातचीत शुरू करने के लिए एक बटन।',
'stay_tuned': 'बने रहें',
'stay_tuned_body': 'दवा एआई को दवा इंडेक्स प्लेटफॉर्म के हिस्से के रूप में सक्रिय रूप से विकसित किया जा रहा है। अपडेट, सुझाव या सहयोग के लिए हमसे संपर्क करें।',
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('druginfo_lang') || 'en';
        this.isFirstVisit = !localStorage.getItem('druginfo_visited');
    }
    
    init() {
        if (this.isFirstVisit) {
            this.showLanguageModal();
            localStorage.setItem('druginfo_visited', 'true');
        } else {
            this.applyLanguage(this.currentLang);
        }
        this.addLanguageSwitcher();
    }
    
    showLanguageModal() {
        const modalHTML = `
            <div class="language-modal" id="languageModal">
                <div class="language-modal-content">
                    <h2>In which language are you comfortable to access the website?</h2>
                    <h3 style="color: #666; margin-bottom: 2rem;">वेबसाइट एक्सेस करने के लिए आप किस भाषा में सहज हैं?</h3>
                    <div class="language-options">
                        <button class="language-btn language-btn-english" onclick="window.languageManager.setLanguage('en')">
                            <i class="fas fa-globe"></i><span>English</span>
                        </button>
                        <button class="language-btn language-btn-hindi" onclick="window.languageManager.setLanguage('hi')">
                            <i class="fas fa-globe-asia"></i><span>हिन्दी (Hindi)</span>
                        </button>
                    </div>
                    <div class="language-footer">
                        <p>You can change language anytime from the header</p>
                        <p>आप हेडर से कभी भी भाषा बदल सकते हैं</p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    addLanguageSwitcher() {
        const header = document.querySelector('header .header-content, header .container');
        if (header) {
            const languageSwitcher = `
                <div class="language-switcher">
                    <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" onclick="window.languageManager.setLanguage('en')">
                        <i class="fas fa-globe"></i><span>EN</span>
                    </button>
                    <button class="lang-btn ${this.currentLang === 'hi' ? 'active' : ''}" onclick="window.languageManager.setLanguage('hi')">
                        <i class="fas fa-globe-asia"></i><span>हिं</span>
                    </button>
                </div>
            `;
            const authButtons = header.querySelector('.auth-buttons');
            if (authButtons) {
                authButtons.insertAdjacentHTML('beforebegin', languageSwitcher);
            } else {
                header.insertAdjacentHTML('beforeend', languageSwitcher);
            }
        }
    }
    
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('druginfo_lang', lang);
        this.applyLanguage(lang);
        this.updateLanguageSwitcher();
        
        // Dispatch event for dynamic scripts like interactionChecker.js
        document.dispatchEvent(new Event('languageChanged'));

        const modal = document.getElementById('languageModal');
        if (modal) modal.remove();
        this.showLanguageChangeNotification(lang);
    }
    
    applyLanguage(lang) {
        document.documentElement.lang = lang;
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    }
    
    updateLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        const enBtn = document.querySelector('.lang-btn:nth-child(1)');
        const hiBtn = document.querySelector('.lang-btn:nth-child(2)');
        if (this.currentLang === 'en' && enBtn) enBtn.classList.add('active');
        else if (this.currentLang === 'hi' && hiBtn) hiBtn.classList.add('active');
    }
    
    showLanguageChangeNotification(lang) {
        const messages = { en: 'Language changed to English', hi: 'भाषा हिंदी में बदली गई' };
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.style.cssText = `
            position: fixed; top: 80px; right: 20px; background: ${lang === 'en' ? '#2a5a7c' : '#FF9933'};
            color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000; display: flex; align-items: center; gap: 10px; animation: slideInRight 0.3s;
        `;
        notification.innerHTML = `<i class="fas fa-check-circle"></i><span>${messages[lang] || 'Language changed'}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.animation = 'slideOutRight 0.3s'; setTimeout(() => notification.remove(), 300); }, 2000);
    }
    
    getTranslation(key) {
        return translations[this.currentLang]?.[key] || translations['en'][key] || key;
    }
}

window.languageManager = new LanguageManager();
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager.init();
});