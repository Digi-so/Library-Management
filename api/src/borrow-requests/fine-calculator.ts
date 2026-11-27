export function calculateFine(
  dueDate: Date,
  returnDate: Date,
  ratePerDay: number,
): number {
  const differenceInMs = returnDate.getTime() - dueDate.getTime()
  const daysLate = Math.ceil(
    differenceInMs / (1000 * 60 * 60 * 24),
  )

  if (daysLate <= 0) {
    return 0
  }

  return daysLate * ratePerDay
}