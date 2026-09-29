import { describe, expect, it } from 'vitest'
import { WORLD } from './worldGraph'
import { coneAt } from './signalLayer'

// The frozen rule, carried into the lab: a near-miss never touches.
describe('the signal layer · growth cones', () => {
  it('leave at least a fifth of every gap empty, at every phase and strain', () => {
    const ds = [...WORLD.reaches.map((r) => r.gap), 1, 5, 12, 30, 61, 85, 105]
    for (const d of ds)
      for (const k of [0, 0.5, 1])
        for (const strain of [0, 0.5, 1]) {
          const c = coneAt(d, k, strain)
          expect(d - 2 * (c.reach + c.fwd)).toBeGreaterThanOrEqual(0.2 * d - 1e-9)
        }
  })
})
