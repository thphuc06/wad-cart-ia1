import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
const oneItem = (price, qty = 1) => [{ name: 'Món hàng', price, qty }]

test('the result is a number', () => {
  assert.equal(typeof cartTotal(oneItem(1001), options), 'number')
})

test('the result is an integer', () => {
  assert.ok(Number.isInteger(cartTotal(oneItem(1001), options)))
})

test('an empty cart returns 0 with no VAT and no shipping', () => {
  assert.equal(cartTotal([], options), 0)
})

test('a subtotal equal to freeShipFrom charges no shipping', () => {
  assert.equal(cartTotal(oneItem(500000), options), 540000)
})

test('a subtotal just below freeShipFrom charges shipFee', () => {
  assert.equal(cartTotal(oneItem(499999), options), 569999)
})

test('a subtotal above freeShipFrom charges no shipping', () => {
  assert.equal(cartTotal(oneItem(600000), options), 648000)
})

test('the total is rounded to the whole đồng', () => {
  assert.equal(cartTotal(oneItem(1001), options), 31081)
})

test('a negative price throws RangeError', () => {
  assert.throws(() => cartTotal(oneItem(-1), options), RangeError)
})

test('qty 0 throws RangeError', () => {
  assert.throws(() => cartTotal(oneItem(1000, 0), options), RangeError)
})

test('qty -1 throws RangeError', () => {
  assert.throws(() => cartTotal(oneItem(1000, -1), options), RangeError)
})

test('qty 1.5 throws RangeError', () => {
  assert.throws(() => cartTotal(oneItem(1000, 1.5), options), RangeError)
})

test('a price of 0 does not throw', () => {
  assert.doesNotThrow(() => cartTotal(oneItem(0), options))
})

test('the result uses vatRate from options', () => {
  const opts = { vatRate: 0.1, freeShipFrom: 1000000, shipFee: 20000 }
  assert.equal(cartTotal(oneItem(100000), opts), 130000)
})

test('the result uses freeShipFrom and shipFee from options', () => {
  const opts = { vatRate: 0.1, freeShipFrom: 100000, shipFee: 20000 }
  assert.equal(cartTotal(oneItem(100000), opts), 110000)
})

test('a fraction of 0.5 or more rounds up to the next đồng', () => {
  assert.equal(cartTotal(oneItem(1007), options), 31088)
})

test('the subtotal is summed across items before the threshold check', () => {
  const items = [{ name: 'A', price: 300000, qty: 1 }, { name: 'B', price: 200000, qty: 1 }]
  assert.equal(cartTotal(items, options), 540000)
})
