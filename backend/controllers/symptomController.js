const { GoogleGenerativeAI } = require('@google/generative-ai');
const { saveQueryToHistory } = require('../utils/database');

// Initialize AI providers
let genAI = null;
let openai = null;

const aiProvider = process.env.AI_PROVIDER || 'gemini';
const isDemo = !process.env.GEMINI_API_KEY || 
               process.env.GEMINI_API_KEY === 'demo' || 
               process.env.GEMINI_API_KEY === 'your_gemini_api_key_here';

// Initialize Google Gemini
if (!isDemo && aiProvider === 'gemini' && process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error.message);
  }
}

// Initialize OpenAI (fallback)
if (!isDemo && aiProvider === 'openai' && process.env.OPENAI_API_KEY) {
  try {
    const OpenAI = require('openai');
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI:', error.message);
  }
}

const MEDICAL_DISCLAIMER = `
IMPORTANT MEDICAL DISCLAIMER

This tool is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. 

Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read here. If you think you may have a medical emergency, call your doctor or emergency services immediately. This tool does not provide medical advice and is not intended to diagnose, treat, cure, or prevent any disease.

The information provided is based on general medical knowledge and should not be considered as personalized medical advice.
`;

const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender, duration, severity } = req.body;
    
    let analysis;
    let analysisSource = 'demo';
    
    // Check if we have AI available
    if (!isDemo && genAI && aiProvider === 'gemini') {
      console.log('🤖 Using Gemini AI for symptom analysis');
      analysis = await analyzeWithGemini(symptoms, age, gender, duration, severity);
      analysisSource = 'gemini';
    } else if (!isDemo && openai && aiProvider === 'openai') {
      console.log('🤖 Using OpenAI for symptom analysis');
      analysis = await analyzeWithOpenAI(symptoms, age, gender, duration, severity);
      analysisSource = 'openai';
    } else {
      console.log('🔄 Using intelligent demo mode - AI API key not configured');
      analysis = generateIntelligentDemoAnalysis(symptoms, age, gender, duration, severity);
      analysisSource = 'intelligent-demo';
    }

    // Save query to history
    const queryData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      symptoms,
      age,
      gender,
      duration,
      severity,
      analysis,
      source: analysisSource
    };

    await saveQueryToHistory(queryData);

    // Format response
    const response = {
      success: true,
      data: {
        analysis,
        disclaimer: MEDICAL_DISCLAIMER,
        timestamp: new Date().toISOString(),
        queryId: queryData.id,
        source: analysisSource
      },
      message: 'Symptom analysis completed successfully'
    };

    res.json(response);

  } catch (error) {
    console.error('Error in symptom analysis:', error);
    
    if (error.code === 'insufficient_quota' || error.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'API quota exceeded',
        message: 'Our AI service is temporarily unavailable. Please try again later.',
        fallback: provideFallbackAdvice(req.body.symptoms)
      });
    }

    // For any other error, provide intelligent fallback analysis
    const fallbackAnalysis = generateIntelligentDemoAnalysis(
      req.body.symptoms, 
      req.body.age, 
      req.body.gender, 
      req.body.duration, 
      req.body.severity
    );
    
    res.json({
      success: true,
      data: {
        analysis: fallbackAnalysis,
        disclaimer: MEDICAL_DISCLAIMER,
        timestamp: new Date().toISOString(),
        queryId: Date.now().toString(),
        source: 'fallback'
      },
      message: 'Analysis completed using intelligent fallback system'
    });
  }
};

// Symptom-specific analysis functions
const getHeadacheAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Tension-Type Headache (Most Common)
   Description: Often stress-related or due to muscle tension
   Characteristics: Bilateral, pressing or tightening quality, mild to moderate intensity
   Common Triggers: Stress, poor posture, eye strain, dehydration
   Management Considerations: Rest, hydration, stress management, ergonomic improvements

2. Migraine Headache
   Description: Neurological condition with recurrent episodes
   Characteristics: Unilateral, pulsating quality, moderate to severe intensity
   Associated Features: Nausea, sensitivity to light and sound, visual disturbances
   Triggers: Hormonal changes, certain foods, sleep changes, stress

3. Sinus Headache
   Description: Secondary to sinus inflammation or congestion
   Characteristics: Facial pressure, worsens with bending forward
   Associated Features: Nasal congestion, facial tenderness
   Location: Forehead, cheeks, bridge of nose

EMERGENCY INDICATORS - Seek Immediate Care:
- Sudden, severe thunderclap headache
- Headache with fever, stiff neck, or rash  
- Headache following head injury
- Severe headache with vision changes or confusion

RECOMMENDED NEXT STEPS:
1. Maintain adequate hydration and rest
2. Apply cold or warm compress as preferred
3. Practice stress management and relaxation techniques
4. Track headache patterns and potential triggers
5. Consult healthcare provider for frequent or severe headaches`;
};

const getFeverAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Viral Infection (Most Common)
   Description: Self-limiting illness caused by various viruses
   Characteristics: Low to moderate fever, body aches, fatigue
   Duration: Typically resolves within 3-7 days
   Management: Supportive care with rest and increased fluid intake

2. Bacterial Infection
   Description: Localized or systemic bacterial infection
   Characteristics: Higher fever, may have specific localizing symptoms
   Common Sites: Respiratory tract, urinary tract, skin, soft tissue
   Management: May require antibiotic therapy after medical evaluation

3. Inflammatory Response
   Description: Non-infectious cause of fever
   Characteristics: May be chronic or recurrent
   Considerations: Autoimmune conditions, medication reactions
   Evaluation: Requires comprehensive medical assessment

EMERGENCY INDICATORS - Seek Immediate Care:
- Fever above 103°F (39.4°C)
- Difficulty breathing or chest pain
- Severe headache with neck stiffness
- Signs of dehydration (decreased urination, dizziness)
- Fever persisting more than 3 days without improvement

RECOMMENDED NEXT STEPS:
1. Ensure adequate rest and increase fluid intake
2. Use appropriate fever reducers (acetaminophen, ibuprofen) as directed
3. Monitor temperature regularly and document trends
4. Observe for development of additional symptoms
5. Contact healthcare provider for persistent or worsening fever`;
};

const getCoughThroatAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Upper Respiratory Tract Infection
   Description: Viral illness affecting nose, throat, and upper airways
   Characteristics: Cough, sore throat, nasal congestion, mild fever
   Duration: Typically improves within 7-10 days
   Management: Supportive care with rest and symptomatic treatment

2. Bacterial Throat Infection (Streptococcal Pharyngitis)
   Description: Bacterial infection requiring antibiotic treatment
   Characteristics: Severe sore throat, difficulty swallowing, fever
   Physical Findings: May have tonsillar exudate or enlarged lymph nodes
   Diagnosis: Requires throat culture or rapid strep test for confirmation

3. Allergic Rhinosinusitis
   Description: Inflammatory response to environmental allergens
   Characteristics: Seasonal or environmental triggers, postnasal drip
   Associated Features: Itchy eyes, nasal congestion, clear discharge
   Management: Allergen avoidance and antihistamine therapy

EMERGENCY INDICATORS - Seek Immediate Care:
- Severe difficulty swallowing or breathing
- High fever with severe sore throat
- Persistent cough with blood production
- Signs of respiratory distress
- Symptoms persisting beyond 10 days without improvement

RECOMMENDED NEXT STEPS:
1. Maintain hydration with warm, soothing liquids
2. Use throat lozenges or warm salt water gargles for comfort
3. Consider humidification for dry environmental conditions
4. Rest voice if experiencing throat discomfort
5. Seek medical evaluation if bacterial infection is suspected`;
};

const getChestBreathingAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Lower Respiratory Tract Infection
   Description: Infection affecting bronchi or lung tissue (bronchitis/pneumonia)
   Characteristics: Cough with or without sputum, chest discomfort, fever
   Severity Indicators: Shortness of breath, persistent high fever
   Evaluation: May require chest imaging and medical assessment

2. Reactive Airway Disease (Asthma)
   Description: Chronic inflammatory condition of the airways
   Characteristics: Wheezing, chest tightness, cough, breathing difficulty
   Triggers: Allergens, irritants, exercise, respiratory infections
   Management: Bronchodilator therapy and trigger avoidance

3. Anxiety-Related Symptoms
   Description: Physical manifestations of anxiety or panic response
   Characteristics: Chest tightness, rapid breathing, palpitations
   Associated Features: Sense of impending doom, sweating, trembling
   Management: Relaxation techniques and stress management strategies

EMERGENCY INDICATORS - Seek Immediate Care:
- Severe difficulty breathing or respiratory distress
- Chest pain with associated shortness of breath
- Cyanosis (blue discoloration of lips or fingernails)
- Sudden onset of severe symptoms
- Inability to speak in complete sentences due to breathlessness

RECOMMENDED NEXT STEPS:
1. Maintain upright position and remain calm
2. Use prescribed rescue inhaler if available for known asthma
3. Identify and avoid known triggers or irritants
4. Practice controlled, slow deep breathing techniques
5. Contact healthcare provider immediately for urgent evaluation`;
};

const getAbdominalAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Acute Gastroenteritis
   Description: Inflammatory condition of the gastrointestinal tract
   Characteristics: Nausea, vomiting, diarrhea, abdominal cramping
   Common Causes: Viral pathogens, bacterial contamination, food intolerance
   Duration: Typically self-limiting within 24-48 hours

2. Foodborne Illness
   Description: Illness resulting from consumption of contaminated food or water
   Characteristics: Rapid onset following ingestion, may include fever
   Timeline: Symptoms typically develop within hours of exposure
   Severity: May range from mild discomfort to severe dehydration

3. Functional Gastrointestinal Disorders
   Description: Chronic conditions affecting digestive function
   Examples: Irritable bowel syndrome, gastroesophageal reflux disease
   Characteristics: May be stress-related or triggered by specific foods
   Management: Dietary modifications and stress management strategies

EMERGENCY INDICATORS - Seek Immediate Care:
- Severe, persistent abdominal pain
- Signs of dehydration (dizziness, decreased urination, dry mucous membranes)
- Blood in vomitus or stool
- High fever accompanying abdominal symptoms
- Inability to retain fluids for more than 24 hours

RECOMMENDED NEXT STEPS:
1. Maintain hydration with small, frequent fluid intake
2. Consider bland diet (bananas, rice, applesauce, toast) when tolerated
3. Avoid dairy products, fatty foods, and spicy preparations
4. Allow gastrointestinal rest by avoiding solid foods initially
5. Monitor symptom progression and seek medical care if deteriorating`;
};

const getFatigueAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Sleep Insufficiency or Sleep Disorders
   Description: Most common cause of persistent fatigue
   Characteristics: Inadequate sleep duration or poor sleep quality
   Contributing Factors: Irregular sleep schedule, sleep apnea, insomnia
   Management: Sleep hygiene optimization and sleep disorder evaluation

2. Post-Viral Syndrome
   Description: Fatigue following recent viral illness
   Characteristics: Persistent tiredness after acute infection resolution
   Pathophysiology: Immune system recovery and cellular repair processes
   Duration: Typically improves gradually over several weeks

3. Psychological Stress or Mood Disorders
   Description: Mental health conditions manifesting with physical fatigue
   Examples: Depression, anxiety disorders, chronic stress
   Characteristics: Fatigue may be accompanied by mood changes
   Management: Stress reduction techniques and mental health support

EMERGENCY INDICATORS - Seek Medical Evaluation:
- Sudden onset of severe fatigue without identifiable cause
- Fatigue persisting longer than 2 weeks without improvement
- Fatigue accompanied by unexplained weight loss
- Fatigue with persistent fever or other concerning symptoms
- Significant impact on daily functioning and quality of life

RECOMMENDED NEXT STEPS:
1. Establish consistent sleep schedule with 7-9 hours nightly
2. Maintain regular bedtime and wake-up times
3. Consume balanced, nutritious meals at regular intervals
4. Ensure adequate hydration while limiting excessive caffeine intake
5. Implement stress management and relaxation techniques
6. Consult healthcare provider if fatigue persists or worsens`;
};

const getPainAnalysis = (symptoms, severity, duration) => {
  const location = symptoms.toLowerCase().includes('back') ? 'back' : 
                  symptoms.toLowerCase().includes('joint') ? 'joint' : 'general';
  
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Musculoskeletal Strain (Most Common for ${location} pain)
   Description: Soft tissue injury from overuse or mechanical stress
   Characteristics: Localized pain, may worsen with movement
   Common Causes: Poor posture, sudden movement, repetitive activities
   Management: Rest, activity modification, conservative treatment

2. Inflammatory Musculoskeletal Condition
   Description: Inflammatory process affecting joints, muscles, or connective tissue
   Examples: Arthritis, tendinitis, bursitis
   Characteristics: May be persistent, affect multiple areas
   Management: Anti-inflammatory approaches and activity modification

3. Neuropathic Pain
   Description: Pain originating from nerve tissue dysfunction
   Characteristics: Sharp, burning, electric-like sensations
   Associated Features: Numbness, tingling, altered sensation
   Evaluation: May require neurological assessment

EMERGENCY INDICATORS - Seek Immediate Care:
- Sudden severe pain following traumatic injury
- Pain accompanied by numbness, weakness, or paralysis
- Pain with complete loss of function or mobility
- Pain with fever or signs of systemic infection
- Severe pain unresponsive to appropriate analgesic medication

RECOMMENDED NEXT STEPS:
1. Allow affected area to rest and avoid aggravating activities
2. Apply cold therapy for acute injuries, heat for muscle tension
3. Consider appropriate over-the-counter analgesics as directed
4. Perform gentle range-of-motion exercises as tolerated
5. Avoid activities that exacerbate pain symptoms
6. Seek medical evaluation if pain persists or progressively worsens`;
};

const getCancerConcernAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

UNDERSTANDING HEALTH CONCERNS (Educational Information Only):

1. Health Anxiety and Symptom Awareness
   Description: Common psychological response to physical symptoms
   Characteristics: Heightened awareness of bodily sensations
   Important Note: Most symptoms have benign, non-serious explanations
   Management: Professional evaluation provides appropriate reassurance

2. Need for Comprehensive Medical Evaluation
   Description: Systematic assessment by qualified healthcare professionals
   Components: Clinical history, physical examination, appropriate testing
   Importance: Only medical professionals can provide accurate diagnosis
   Process: May require multiple assessments and diagnostic procedures

3. Preventive Healthcare and Early Detection
   Description: Regular monitoring and screening programs
   Benefits: Early identification of health issues when most treatable
   Components: Age-appropriate screenings, family history assessment
   Approach: Proactive rather than reactive healthcare management

IMPORTANT - Immediate Medical Consultation Recommended:
- Any persistent, unexplained symptoms lasting longer than expected
- Changes in pattern or character of existing symptoms
- New masses, lumps, or growths detected during self-examination
- Unexplained weight loss or gain over short time periods
- Persistent fatigue or pain without identifiable cause
- Any symptoms causing significant concern or anxiety

RECOMMENDED NEXT STEPS:
1. Schedule prompt appointment with primary healthcare provider
2. Document comprehensive symptom history including duration and severity
3. Prepare detailed list of questions and specific concerns
4. Compile relevant family medical history information
5. Complete all recommended diagnostic tests and specialist referrals
6. Maintain regular follow-up appointments as advised

IMPORTANT PERSPECTIVE:
The vast majority of health concerns have benign explanations. However, professional medical evaluation is always the appropriate course of action for persistent symptoms and provides the most reliable path to accurate diagnosis and peace of mind.`;
};

const getAnxietyAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Acute Stress Response
   Description: Normal physiological response to immediate stressors
   Characteristics: Temporary anxiety related to specific situations
   Duration: Usually resolves when stressor is removed or managed
   Management: Stress reduction techniques and coping strategies

2. Anxiety Disorders
   Description: Persistent, excessive worry affecting daily functioning
   Types: Generalized anxiety disorder, panic disorder, specific phobias
   Characteristics: Symptoms persist beyond normal stress responses
   Management: Professional mental health evaluation and treatment

3. Somatic Manifestations of Anxiety
   Description: Physical symptoms resulting from anxiety response
   Examples: Rapid heartbeat, sweating, trembling, breathing changes
   Important Note: Can mimic symptoms of other medical conditions
   Evaluation: Medical assessment may be needed to rule out organic causes

EMERGENCY INDICATORS - Seek Immediate Help:
- Thoughts of self-harm or suicide
- Panic attacks accompanied by chest pain or severe breathing difficulty
- Complete inability to function in essential daily activities
- Use of substances to cope with anxiety symptoms
- Anxiety accompanied by severe depression or mood changes

RECOMMENDED NEXT STEPS:
1. Practice controlled breathing and progressive relaxation techniques
2. Maintain regular physical exercise and consistent sleep schedule
3. Limit caffeine intake and avoid alcohol as coping mechanism
4. Engage trusted friends, family, or support network
5. Explore evidence-based stress management strategies
6. Consult mental health professional or primary care provider for evaluation

MENTAL HEALTH RESOURCES:
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Professional mental health services and online resources available`;
};

const getGeneralAnalysis = (symptoms, severity, duration) => {
  return `CLINICAL ASSESSMENT

POSSIBLE CONDITIONS (Educational Information Only):

1. Common Medical Condition
   Description: Many symptoms have benign, treatable explanations
   Characteristics: Often represents body's normal response to various factors
   Management: Frequently improves with appropriate basic care and time
   Prognosis: Generally favorable with proper attention

2. Lifestyle or Environmental Factors
   Description: Symptoms related to daily habits or environmental exposures
   Examples: Stress, dietary factors, sleep patterns, environmental irritants
   Assessment: Consider recent changes in routine or circumstances
   Management: Often responsive to targeted lifestyle modifications

3. Need for Professional Medical Evaluation
   Description: Some symptoms require clinical assessment for accurate diagnosis
   Importance: Healthcare providers can perform appropriate diagnostic testing
   Timing: Should not delay care for concerning or persistent symptoms
   Benefits: Professional evaluation provides definitive assessment and treatment

GENERAL WARNING SIGNS - Seek Medical Care:
- Sudden, severe onset of symptoms without clear cause
- Symptoms that progressively worsen over time
- Significant interference with daily activities or quality of life
- Persistent symptoms lasting more than reasonable expected duration
- Any symptoms causing substantial concern or anxiety

RECOMMENDED NEXT STEPS:
1. Monitor symptom progression and document changes over time
2. Maintain good general health practices and self-care
3. Ensure adequate hydration and restorative sleep
4. Consider potential triggers, causes, or precipitating factors
5. Document symptoms thoroughly for healthcare provider consultation
6. Schedule appropriate medical evaluation for proper clinical assessment

GENERAL HEALTH MAINTENANCE:
- Establish and maintain regular, consistent sleep schedule
- Consume balanced, nutritious meals at regular intervals
- Engage in appropriate physical activity as tolerated
- Implement effective stress management strategies
- Identify and avoid known triggers when possible`;
};

const analyzeWithGemini = async (symptoms, age, gender, duration, severity) => {
  try {
    // Use the stable Gemini 2.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are a medical education assistant. Analyze the following symptoms and provide educational information about possible conditions and recommendations. Always emphasize that this is for educational purposes only and professional medical advice should be sought.

Patient Information:
- Symptoms: ${symptoms}
- Age: ${age || 'Not specified'}
- Gender: ${gender || 'Not specified'}
- Duration: ${duration || 'Not specified'}
- Severity: ${severity || 'Not specified'}

Please provide a structured, professional clinical assessment in the following format:

CLINICAL ASSESSMENT

SYMPTOM ANALYSIS
Brief overview of the reported symptoms.

POSSIBLE CONDITIONS (Educational Information Only):

1. [Most Likely Condition Name]
   Description: Brief medical description
   Characteristics: Key features and presentation
   Contributing Factors: Common causes or risk factors
   Management: General approach to treatment

2. [Second Possibility]
   Description: Brief medical description
   Characteristics: Key features and presentation
   Contributing Factors: Common causes or risk factors
   Management: General approach to treatment

3. [Third Possibility if relevant]
   Description: Brief medical description
   Characteristics: Key features and presentation
   Contributing Factors: Common causes or risk factors
   Management: General approach to treatment

EMERGENCY INDICATORS - Seek Immediate Care:
List urgent warning signs related to these symptoms

RECOMMENDED NEXT STEPS:
1. Immediate self-care actions
2. Lifestyle recommendations
3. When to contact healthcare provider
4. Follow-up considerations

Remember to:
- Use professional medical terminology appropriately
- Be specific to the symptoms and demographics provided
- Emphasize educational nature and need for professional consultation
- Avoid using asterisks, emojis, or informal symbols
- Use clean, clinical formatting
- Include appropriate urgency levels`;

    console.log(`🤖 Using Gemini model: gemini-2.5-flash`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(`✅ Gemini analysis completed successfully`);
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};

const analyzeWithOpenAI = async (symptoms, age, gender, duration, severity) => {
  const prompt = `You are a medical education assistant. Based on the following symptoms, provide possible conditions and educational recommendations. Always emphasize seeking professional medical care.

Patient Information:
- Symptoms: ${symptoms}
- Age: ${age || 'Not specified'}
- Gender: ${gender || 'Not specified'}
- Duration: ${duration || 'Not specified'}
- Severity: ${severity || 'Not specified'}

Please provide:
1. 3-5 possible conditions that could explain these symptoms (ranked by likelihood)
2. Recommended next steps
3. When to seek immediate medical attention
4. General self-care recommendations (if appropriate)

Format your response as a structured analysis. Remember this is for educational purposes only and emphasize the importance of consulting healthcare professionals.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a medical education assistant. Provide helpful, accurate information while emphasizing the importance of professional medical care. Always include appropriate disclaimers and safety warnings."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 1000,
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
};

const generateIntelligentDemoAnalysis = (symptoms, age, gender, duration, severity) => {
  const symptomLower = symptoms.toLowerCase();
  
  // Symptom-specific analysis patterns
  let analysis = `🔍 EDUCATIONAL SYMPTOM ANALYSIS (Intelligent Demo Mode)\n\nBased on your reported symptoms: "${symptoms}"\n\nPatient Information:\n- Age: ${age || 'Not specified'}\n- Gender: ${gender || 'Not specified'}\n- Duration: ${duration || 'Not specified'}\n- Severity: ${severity || 'Not specified'}\n\n`;
  
  // Symptom-specific analysis
  if (symptomLower.includes('headache') || symptomLower.includes('head')) {
    analysis += getHeadacheAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('fever') || symptomLower.includes('temperature')) {
    analysis += getFeverAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('cough') || symptomLower.includes('throat')) {
    analysis += getCoughThroatAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('chest') || symptomLower.includes('breathing') || symptomLower.includes('breath')) {
    analysis += getChestBreathingAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('stomach') || symptomLower.includes('abdominal') || symptomLower.includes('nausea') || symptomLower.includes('vomit')) {
    analysis += getAbdominalAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('fatigue') || symptomLower.includes('tired') || symptomLower.includes('exhausted')) {
    analysis += getFatigueAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('pain') || symptomLower.includes('ache') || symptomLower.includes('hurt')) {
    analysis += getPainAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('cancer') || symptomLower.includes('tumor') || symptomLower.includes('mass')) {
    analysis += getCancerConcernAnalysis(symptoms, severity, duration);
  } else if (symptomLower.includes('anxiety') || symptomLower.includes('panic') || symptomLower.includes('stress')) {
    analysis += getAnxietyAnalysis(symptoms, severity, duration);
  } else {
    analysis += getGeneralAnalysis(symptoms, severity, duration);
  }
  
  analysis += `\n\n⚠️ IMPORTANT: This is an INTELLIGENT DEMO analysis for educational purposes only. For real medical advice, please consult with a qualified healthcare professional.\n\nNote: To get AI-powered analysis with Google Gemini, please configure a valid Gemini API key in the backend environment variables.`;
  
  return analysis;
};

const provideFallbackAdvice = (symptoms) => {
  return generateIntelligentDemoAnalysis(symptoms, null, null, null, null);
};

module.exports = {
  analyzeSymptoms
};
