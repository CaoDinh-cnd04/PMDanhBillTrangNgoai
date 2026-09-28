import { CARRIER_LIMIT_RULES } from '../../pricing/domain/pricing.types.js';
export class OrderPolicies {
    /**
     * Rule: Calculate volumetric weight for package items: (L * W * H) / 5000 * quantity
     */
    static calculatePackagesTotals(items) {
        let totalPieces = 0;
        let totalGrossWeight = 0;
        let totalVolumetricWeight = 0;
        const itemsWithVol = items.map(item => {
            const sl = item.sl || 1;
            const d = item.d || 0;
            const w = item.w || 0;
            const h = item.h || 0;
            const g = item.g || 0;
            const vol = +((d * w * h) / 5000 * sl).toFixed(2);
            totalPieces += sl;
            totalGrossWeight += g * sl;
            totalVolumetricWeight += vol;
            return {
                ...item,
                vol
            };
        });
        const chargeableWeight = Math.max(totalGrossWeight, totalVolumetricWeight);
        return {
            totalPieces,
            totalGrossWeight: +totalGrossWeight.toFixed(1),
            totalVolumetricWeight: +totalVolumetricWeight.toFixed(1),
            chargeableWeight: +chargeableWeight.toFixed(1),
            itemsWithVol
        };
    }
    /**
     * Rule: Evaluates carrier dimension and weight limits against service rules.
     */
    static evaluateCarrierWarnings(service, items, grossWeight, volWeight) {
        const rules = CARRIER_LIMIT_RULES[service] || CARRIER_LIMIT_RULES._default;
        const warnings = [];
        items.forEach((item, idx) => {
            const d = item.d || 0;
            const w = item.w || 0;
            const h = item.h || 0;
            const g = item.g || 0;
            if (!d && !w && !h && !g)
                return;
            const longest = Math.max(d, w, h);
            const sum = d + w + h;
            if (longest > rules.nonSide || g > rules.nonWeight) {
                warnings.push({
                    lv: 'crit',
                    t: `Kiện ${idx + 1}: vượt giới hạn nhận của ${service || 'dịch vụ'}`,
                    d: `Cạnh dài ${longest}cm / cân ${g}kg vượt mức tối đa. Cần chia nhỏ kiện hoặc chuyển sang dịch vụ Chuyên tuyến/SEA.`
                });
                return;
            }
            if (longest > rules.maxSide) {
                warnings.push({
                    lv: 'warn',
                    t: `Kiện ${idx + 1}: hàng quá khổ (Oversize)`,
                    d: `Cạnh dài ${longest}cm > ${rules.maxSide}cm → dễ bị phụ phí hàng cồng kềnh.`
                });
            }
            if (sum > rules.maxSum) {
                warnings.push({
                    lv: 'warn',
                    t: `Kiện ${idx + 1}: tổng kích thước lớn`,
                    d: `D+R+C = ${sum}cm > ${rules.maxSum}cm → có thể bị phụ phí quá khổ.`
                });
            }
            if (g > rules.maxWeight) {
                warnings.push({
                    lv: 'warn',
                    t: `Kiện ${idx + 1}: quá nặng (Overweight)`,
                    d: `Cân ${g}kg > ${rules.maxWeight}kg/kiện → phụ phí xử lý hàng nặng.`
                });
            }
        });
        if (grossWeight > 0 && volWeight > grossWeight + 0.01) {
            warnings.push({
                lv: 'info',
                t: 'Tính cước theo trọng lượng quy đổi',
                d: `Quy đổi ${volWeight.toFixed(1)}kg > cân thực ${grossWeight.toFixed(1)}kg → cước tính theo ${volWeight.toFixed(1)}kg. Đóng gói gọn hơn để giảm cước.`
            });
        }
        return warnings;
    }
    /**
     * Rule: DOC > 2kg must be converted to PACK.
     */
    static shouldConvertToPack(type, docWeight) {
        return type === 'DOC' && docWeight > 2.0;
    }
    /**
     * Rule: Additional fees calculation (domestic <12kg, remote country).
     */
    static computeAdditionalFees(country, chargeWeight) {
        const fees = [];
        if (chargeWeight > 0 && chargeWeight < 12) {
            fees.push({ name: 'Phụ phí giao nội địa (kiện < 12kg)', amount: 500000 });
        }
        if (['United States', 'Australia', 'Canada'].includes(country)) {
            fees.push({ name: 'Phụ phí vùng sâu vùng xa', amount: 450000 });
        }
        return fees;
    }
}
//# sourceMappingURL=order.policies.js.map