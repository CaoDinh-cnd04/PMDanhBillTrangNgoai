/**
 * 140 standard weight steps: 0.5kg, 1.0kg, 1.5kg, ... 70.0kg
 */
export const WEIGHT_STEPS = (() => {
    const steps = [];
    for (let w = 0.5; w <= 70.0001; w += 0.5) {
        steps.push(+w.toFixed(1));
    }
    return steps;
})();
export const CARRIER_LIMIT_RULES = {
    _default: { maxSide: 120, maxSum: 300, maxWeight: 30, nonSide: 200, nonWeight: 100 },
    DHL: { maxSide: 120, maxSum: 300, maxWeight: 31.5, nonSide: 120, nonWeight: 70 },
    Fedex: { maxSide: 121, maxSum: 330, maxWeight: 31.5, nonSide: 121, nonWeight: 68 },
    UPS: { maxSide: 122, maxSum: 330, maxWeight: 31.5, nonSide: 122, nonWeight: 70 },
    Aramex: { maxSide: 120, maxSum: 300, maxWeight: 30, nonSide: 150, nonWeight: 70 },
    'Chuyên tuyến': { maxSide: 150, maxSum: 330, maxWeight: 45, nonSide: 220, nonWeight: 120 },
    Ecommerce: { maxSide: 100, maxSum: 250, maxWeight: 20, nonSide: 150, nonWeight: 50 },
    SEA: { maxSide: 300, maxSum: 600, maxWeight: 1000, nonSide: 600, nonWeight: 2000 }
};
//# sourceMappingURL=pricing.types.js.map