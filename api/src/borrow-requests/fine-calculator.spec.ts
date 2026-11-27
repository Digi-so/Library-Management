import { calculateFine } from './fine-calculator'

describe('calculateFine', () => {
  it('returns 0 for an on-time return', () => {
    const dueDate = new Date('2026-11-10T00:00:00Z')
    const returnDate = new Date('2026-11-10T00:00:00Z')

    expect(calculateFine(dueDate, returnDate, 5)).toBe(0)
  })

  it('calculates a fine for a late return', () => {
    const dueDate = new Date('2026-11-10T00:00:00Z')
    const returnDate = new Date('2026-11-13T00:00:00Z')

    expect(calculateFine(dueDate, returnDate, 5)).toBe(15)
  })
})