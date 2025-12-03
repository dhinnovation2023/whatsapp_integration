
export function calculateTax(prices: number[]) {
    const priceSum = prices.reduce((sum, item) => sum + item, 0);
    const taxValue = priceSum * 0.05;
    return taxValue.toFixed(2);
}