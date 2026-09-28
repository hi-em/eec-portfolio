// THE LEDGER'S CREDIT ROWS (ruling 96, 2026-09-28): WHERE · WHO · MY PART on
// every sheet and book plate. Each rule below is one she ruled on, measured.
import { describe, expect, it } from 'vitest'
import { ALL_PROJECT_METAS } from './index'

describe('ledger credit rows', () => {
  it.each(ALL_PROJECT_METAS.map(m => [m.slug, m] as const))('%s has WHERE and WHO', (_, m) => {
    expect(m.where.trim()).not.toBe('')
    expect(m.who.trim()).not.toBe('')
  })

  it('WHERE never carries a date (her ruling: "remove the dates")', () => {
    const dated = ALL_PROJECT_METAS.filter(m => /\b(19|20)\d{2}\b/.test(m.where)).map(m => m.slug)
    expect(dated).toEqual([])
  })

  it('MY PART fits one line on both surfaces (≤ 52 characters: the book’s 107mm value column, measured)', () => {
    const long = ALL_PROJECT_METAS.filter(m => (m.myPart?.length ?? 0) > 52).map(m => `${m.slug} ${m.myPart!.length}`)
    expect(long).toEqual([])
  })

  it('solo work shows no MY PART row; the podcast is never split (08-19)', () => {
    const wrong = ALL_PROJECT_METAS.filter(m => (m.who === 'SOLO' || m.slug === 'podcast') && m.myPart).map(m => m.slug)
    expect(wrong).toEqual([])
  })

  it('every team sheet names a part', () => {
    const missing = ALL_PROJECT_METAS.filter(m => m.who !== 'SOLO' && m.slug !== 'podcast' && !m.myPart).map(m => m.slug)
    expect(missing).toEqual([])
  })

  it('no em or en dashes in the rows', () => {
    const dashed = ALL_PROJECT_METAS.filter(m => /[—–]/.test(`${m.where} ${m.who} ${m.myPart ?? ''}`)).map(m => m.slug)
    expect(dashed).toEqual([])
  })
})
