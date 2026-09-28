import { ParsedReceiverResult, AiRecognizedItem } from '../domain/ai.types.js';
export declare class HeuristicAiService {
    /**
     * Parse unformatted multiline receiver paste text into structured fields.
     */
    parseReceiverText(rawText: string): ParsedReceiverResult;
    /**
     * Get sample recognized items or simulate vision inference on image files.
     */
    getKnowledgeItems(): AiRecognizedItem[];
    recognizeImageItem(key?: string): AiRecognizedItem;
}
