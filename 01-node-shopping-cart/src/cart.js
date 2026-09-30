// Shopping cart with percentage discount codes and sales tax.
const DISCOUNT_CODES = { SAVE10: 0.10, SAVE25: 0.25 };

export class Cart {
  constructor(taxRate = 0.08) {
    this.items = [];
    this.taxRate = taxRate;
    this.discount = 0;
  }

  add(name, price, qty = 1) {
    const existing = this.items.find((i) => i.name === name);
    if (existing) {
      existing.qty = qty; // BUG: should add to the existing quantity
    } else {
      this.items.push({ name, price, qty });
    }
  }

  applyCode(code) {
    const rate = DISCOUNT_CODES[code];
    if (rate === undefined) throw new Error(`Invalid code: ${code}`);
    this.discount = rate;
  }

  subtotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  total() {
    // BUG: tax is calculated on the pre-discount subtotal
    const tax = this.subtotal() * this.taxRate;
    const discounted = this.subtotal() * (1 - this.discount);
    return Math.round((discounted + tax) * 100) / 100;
  }
}
