import type { StaticImageData } from "next/image";
import chatgptLogo from "@/assets/llm-logos/chatgpt.png";
import claudeLogo from "@/assets/llm-logos/claude.png";
import geminiLogo from "@/assets/llm-logos/gemini.png";
import grokLogo from "@/assets/llm-logos/grok.svg";
import perplexityLogo from "@/assets/llm-logos/perplexity.png";

export type LlmModel = {
  name: string;
  logo: StaticImageData;
};

export const llmModels: LlmModel[] = [
  { name: "ChatGPT", logo: chatgptLogo },
  { name: "Claude", logo: claudeLogo },
  { name: "Gemini", logo: geminiLogo },
  { name: "Perplexity", logo: perplexityLogo },
  { name: "Grok", logo: grokLogo },
];
