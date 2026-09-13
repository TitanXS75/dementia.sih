// Local In-Browser Whisper Speech Recognition
// Powered by @xenova/transformers running 100% locally via WebAssembly
// Zero API keys, zero cloud servers, zero billing.

import { pipeline, env } from "@xenova/transformers";

// Configure transformers.js for browser environment
env.allowLocalModels = false;
env.useBrowserCache = true;

let transcriberInstance: any = null;
let isModelLoading = false;

export async function getWhisperTranscriber(
  onProgress?: (progress: { status: string; progress?: number }) => void
) {
  if (transcriberInstance) return transcriberInstance;

  if (isModelLoading) {
    // Wait until loading finishes
    while (isModelLoading) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return transcriberInstance;
  }

  try {
    isModelLoading = true;
    transcriberInstance = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny",
      {
        progress_callback: onProgress,
      }
    );
    isModelLoading = false;
    return transcriberInstance;
  } catch (error) {
    isModelLoading = false;
    console.warn("Failed to load Whisper Web:", error);
    throw error;
  }
}

/**
 * Converts any audio Blob from MediaRecorder into a 16kHz mono Float32Array
 * required by Whisper.
 */
export async function audioBlobToFloat32Array(blob: Blob): Promise<Float32Array> {
  const arrayBuffer = await blob.arrayBuffer();
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
    sampleRate: 16000,
  });
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const pcmData = audioBuffer.getChannelData(0);
  await audioCtx.close();
  return pcmData;
}

/**
 * Transcribes audio locally in the browser with Whisper.
 */
export async function transcribeAudioLocally(
  audioBlob: Blob,
  language?: string,
  onProgress?: (p: any) => void
): Promise<string> {
  const transcriber = await getWhisperTranscriber(onProgress);
  const pcmAudio = await audioBlobToFloat32Array(audioBlob);

  const output = await transcriber(pcmAudio, {
    language: language || "english",
    task: "transcribe",
    chunk_length_s: 30,
    stride_length_s: 5,
  });

  return (output?.text || "").trim();
}
