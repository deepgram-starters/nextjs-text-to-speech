/**
 * Deepgram Text-to-Speech Service
 * 
 * This service handles all communication with the Deepgram API.
 * 
 * To remove Deepgram integration:
 * 1. Delete this file
 * 2. Delete app/api/speak/route.ts
 * 3. Replace the textToSpeech call in Controls.tsx with your own TTS solution
 * 4. Remove @deepgram/sdk from package.json
 */

export interface TextToSpeechOptions {
    text: string;
    model?: string;
}

export const textToSpeech = async ({
    text,
    model = "aura-2-thalia-en"
}: TextToSpeechOptions): Promise<Blob> => {
    const response = await fetch(`/api/speak?model=${model}`, {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        throw new Error(`Text-to-speech failed: ${response.statusText}`);
    }

    return await response.blob();
};

// Available Deepgram Aura-2 English models
export const DEEPGRAM_AURA2_EN_MODELS = {
    // Featured voices
    "aura-2-thalia-en": "Thalia - Clear, Confident, Energetic (American)",
    "aura-2-andromeda-en": "Andromeda - Casual, Expressive (American)",
    "aura-2-helena-en": "Helena - Caring, Natural, Friendly (American)",
    "aura-2-apollo-en": "Apollo - Confident, Comfortable (American)",
    "aura-2-arcas-en": "Arcas - Natural, Smooth, Clear (American)",
    "aura-2-aries-en": "Aries - Warm, Energetic, Caring (American)",

    // All other English voices
    "aura-2-amalthea-en": "Amalthea - Engaging, Cheerful (Filipino)",
    "aura-2-asteria-en": "Asteria - Clear, Confident, Knowledgeable (American)",
    "aura-2-athena-en": "Athena - Calm, Smooth, Professional (American)",
    "aura-2-atlas-en": "Atlas - Enthusiastic, Confident (American)",
    "aura-2-aurora-en": "Aurora - Cheerful, Expressive (American)",
    "aura-2-callista-en": "Callista - Clear, Professional (American)",
    "aura-2-cora-en": "Cora - Smooth, Melodic, Caring (American)",
    "aura-2-cordelia-en": "Cordelia - Approachable, Warm (American)",
    "aura-2-delia-en": "Delia - Casual, Friendly, Cheerful (American)",
    "aura-2-draco-en": "Draco - Warm, Trustworthy (British)",
    "aura-2-electra-en": "Electra - Professional, Engaging (American)",
    "aura-2-harmonia-en": "Harmonia - Empathetic, Clear, Calm (American)",
    "aura-2-hera-en": "Hera - Smooth, Warm, Professional (American)",
    "aura-2-hermes-en": "Hermes - Expressive, Engaging (American)",
    "aura-2-hyperion-en": "Hyperion - Caring, Warm (Australian)",
    "aura-2-iris-en": "Iris - Cheerful, Positive (American)",
    "aura-2-janus-en": "Janus - Southern, Smooth (American)",
    "aura-2-juno-en": "Juno - Natural, Engaging, Melodic (American)",
    "aura-2-jupiter-en": "Jupiter - Expressive, Knowledgeable (American)",
    "aura-2-luna-en": "Luna - Friendly, Natural (American)",
    "aura-2-mars-en": "Mars - Smooth, Patient, Trustworthy (American)",
    "aura-2-minerva-en": "Minerva - Positive, Friendly (American)",
    "aura-2-neptune-en": "Neptune - Professional, Patient (American)",
    "aura-2-odysseus-en": "Odysseus - Calm, Smooth, Professional (American)",
    "aura-2-ophelia-en": "Ophelia - Expressive, Enthusiastic (American)",
    "aura-2-orion-en": "Orion - Approachable, Calm (American)",
    "aura-2-orpheus-en": "Orpheus - Professional, Clear, Confident (American)",
    "aura-2-pandora-en": "Pandora - Smooth, Calm, Melodic (British)",
    "aura-2-phoebe-en": "Phoebe - Energetic, Warm (American)",
    "aura-2-pluto-en": "Pluto - Smooth, Calm, Empathetic (American)",
    "aura-2-saturn-en": "Saturn - Knowledgeable, Confident (American)",
    "aura-2-selene-en": "Selene - Expressive, Engaging (American)",
    "aura-2-theia-en": "Theia - Expressive, Polite (Australian)",
    "aura-2-vesta-en": "Vesta - Natural, Patient, Empathetic (American)",
    "aura-2-zeus-en": "Zeus - Deep, Trustworthy, Smooth (American)",
} as const;

// Available Deepgram Aura-2 Spanish models
export const DEEPGRAM_AURA2_ES_MODELS = {
    // Featured voices
    "aura-2-celeste-es": "Celeste - Clear, Energetic, Friendly (Colombian)",
    "aura-2-estrella-es": "Estrella - Approachable, Natural, Calm (Mexican)",
    "aura-2-nestor-es": "Nestor - Calm, Professional, Clear (Peninsular)",

    // All other Spanish voices
    "aura-2-sirio-es": "Sirio - Calm, Professional, Empathetic (Mexican)",
    "aura-2-carina-es": "Carina - Professional, Energetic (Peninsular)",
    "aura-2-alvaro-es": "Alvaro - Calm, Professional, Clear (Peninsular)",
    "aura-2-diana-es": "Diana - Professional, Confident (Peninsular)",
    "aura-2-aquila-es": "Aquila - Expressive, Enthusiastic (Latin American)",
    "aura-2-selena-es": "Selena - Approachable, Friendly (Latin American)",
    "aura-2-javier-es": "Javier - Approachable, Professional (Latin American)",
} as const;

// Legacy Aura 1 English models (still available but not recommended)
export const DEEPGRAM_AURA1_EN_MODELS = {
    "aura-asteria-en": "Asteria - Clear, Confident (American)",
    "aura-luna-en": "Luna - Friendly, Natural (American)",
    "aura-stella-en": "Stella - Clear, Professional (American)",
    "aura-athena-en": "Athena - Calm, Smooth (British)",
    "aura-hera-en": "Hera - Smooth, Warm (American)",
    "aura-orion-en": "Orion - Approachable, Calm (American)",
    "aura-arcas-en": "Arcas - Natural, Smooth (American)",
    "aura-perseus-en": "Perseus - Confident, Professional (American)",
    "aura-angus-en": "Angus - Warm, Friendly (Irish)",
    "aura-orpheus-en": "Orpheus - Professional, Clear (American)",
    "aura-helios-en": "Helios - Professional, Clear (British)",
    "aura-zeus-en": "Zeus - Deep, Trustworthy (American)",
} as const;

// All models combined
export const DEEPGRAM_MODELS = {
    ...DEEPGRAM_AURA2_EN_MODELS,
    ...DEEPGRAM_AURA2_ES_MODELS,
    ...DEEPGRAM_AURA1_EN_MODELS,
} as const;

export type DeepgramModel = keyof typeof DEEPGRAM_MODELS; 