export const orgIconMap: Record<string, string> = {
  OpenAI: "openai",
  Anthropic: "anthropic",
  Google: "google",
  DeepSeek: "deepseek",
  Meta: "meta",
  Alibaba: "alibaba",
  xAI: "xai",
  Mistral: "mistral",
  MiniMax: "minimax",
  Moonshot: "moonshotai",
  ZAI: "z-ai",
}

export function resolveOrgIcon(orgDisplayName: string): string {
  return orgIconMap[orgDisplayName] ?? orgDisplayName.toLowerCase()
}

