export function cartTotal(items, options) {
  for (const { price, qty } of items) {
    if (price < 0) throw new RangeError('price must not be negative')
    if (!Number.isInteger(qty) || qty < 1) throw new RangeError('qty must be a positive integer')
  }
  if (items.length === 0) return 0

  const { vatRate, freeShipFrom, shipFee } = options
  const subtotal = items.reduce((sum, { price, qty }) => sum + price * qty, 0)
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee
  return Math.round(subtotal + vatRate * subtotal + shipping)
}
