import { describe, it, expect } from 'vitest'
import { orgIconMap, resolveOrgIcon } from '../components/orgIconMap'

// Keep this in sync with the SVG files in /public
const expected: Record<string, string> = {
  OpenAI: 'openai',
  Anthropic: 'anthropic',
  Google: 'google',
  DeepSeek: 'deepseek',
  Meta: 'meta',
  Alibaba: 'alibaba',
  xAI: 'xai',
  Mistral: 'mistral',
  MiniMax: 'minimax',
  Moonshot: 'moonshotai',
  ZAI: 'z-ai',
}

describe('Organization icon mapping', () => {
  it('exports an exact mapping for known orgs', () => {
    expect(orgIconMap).toEqual(expected)
  })

  it('resolveOrgIcon returns mapped key for known orgs', () => {
    for (const [display, key] of Object.entries(expected)) {
      expect(resolveOrgIcon(display)).toBe(key)
    }
  })

  it('resolveOrgIcon falls back to lowercased name for unknown orgs', () => {
    expect(resolveOrgIcon('UnknownCorp')).toBe('unknowncorp')
  })
})

