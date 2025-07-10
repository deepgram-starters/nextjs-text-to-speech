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
    model = "aura-asteria-en"
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

// Available Deepgram models
export const DEEPGRAM_MODELS = {
    "aura-asteria-en": "Asteria (English)",
    "aura-luna-en": "Luna (English)",
    "aura-stella-en": "Stella (English)",
    "aura-athena-en": "Athena (English)",
    "aura-hera-en": "Hera (English)",
    "aura-orion-en": "Orion (English)",
    "aura-arcas-en": "Arcas (English)",
    "aura-perseus-en": "Perseus (English)",
    "aura-angus-en": "Angus (English)",
    "aura-orpheus-en": "Orpheus (English)",
    "aura-helios-en": "Helios (English)",
    "aura-zeus-en": "Zeus (English)",
} as const;

export type DeepgramModel = keyof typeof DEEPGRAM_MODELS; 