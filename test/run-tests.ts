import assert from 'assert';
import { createApp } from '../src/api/server.js';
import { OrderPolicies } from '../src/modules/orders/domain/order.policies.js';

async function runTests() {
  console.log('🧪 Bắt đầu chạy bộ kiểm thử toàn diện hệ thống Modular Monolith...');
  const { repos } = createApp();

  // Test 1: Catalog Module
  console.log('\n--- 1. Kiểm tra Module Catalog (44 nhóm hàng hóa & gợi ý HS) ---');
  const categories = await repos.catalog.getAllCategories();
  assert.strictEqual(categories.length, 44, 'Phải có đúng 44 nhóm hàng hóa chuẩn');
  console.log(`✓ 44 nhóm hàng hóa chuẩn đã được nạp.`);

  const favCategory = categories[0].name;
  const isFav = await repos.catalog.toggleFavorite(favCategory);
  assert.strictEqual(typeof isFav, 'boolean');
  console.log(`✓ Toggle nhóm yêu thích thành công: ${favCategory}`);

  const suggestions = await repos.catalog.getSuggestions('Quần áo và hàng may mặc');
  assert.ok(suggestions.length > 0, 'Phải có gợi ý HS cho Quần áo');
  assert.strictEqual(suggestions[0].hs, '6109');
  console.log(`✓ Gợi ý mã HS chuẩn: ${suggestions[0].en} - HS ${suggestions[0].hs}`);

  // Test 2: Pricing Module & Quote Engine
  console.log('\n--- 2. Kiểm tra Module Pricing (Báo giá & Phụ phí) ---');
  const services = await repos.pricing.getAllServices();
  assert.ok(services.length >= 6, 'Phải có ít nhất 6 hãng dịch vụ mặc định');
  console.log(`✓ Danh sách dịch vụ (${services.map(s => s.name).join(', ')})`);

  // Test quotes for Singapore 8.0kg
  const quotes = await repos.pricing.calculateQuotes({
    country: 'Singapore',
    grossWeight: 8.0,
    length: 30,
    width: 20,
    height: 15,
    type: 'PACK'
  });
  assert.ok(quotes.length > 0, 'Phải tính được bảng giá so sánh');
  const cheapest = quotes.find(q => q.isCheapest);
  assert.ok(cheapest, 'Phải đánh dấu được dịch vụ rẻ nhất');
  console.log(`✓ Tính cước tuyến Singapore 8kg thành công. Rẻ nhất: ${cheapest.name} (${cheapest.totalFare.toLocaleString('vi-VN')}đ)`);

  // Test 3: Order Policies & Lifecycle
  console.log('\n--- 3. Kiểm tra Order Domain Policies & Vòng đời đơn hàng ---');
  // Check DocToPackRule
  assert.strictEqual(OrderPolicies.shouldConvertToPack('DOC', 1.5), false);
  assert.strictEqual(OrderPolicies.shouldConvertToPack('DOC', 2.5), true, 'Tài liệu > 2kg phải tự chuyển sang PACK');
  console.log('✓ Rule DOC > 2kg -> PACK hoạt động chuẩn xác.');

  // Check Volumetric formula (L*W*H)/5000
  const pkgTotals = OrderPolicies.calculatePackagesTotals([
    { sl: 1, pack: 'Thùng carton', d: 50, w: 40, h: 30, g: 5 } // 50*40*30/5000 = 12kg
  ]);
  assert.strictEqual(pkgTotals.totalVolumetricWeight, 12.0);
  assert.strictEqual(pkgTotals.chargeableWeight, 12.0, 'Trọng lượng tính cước phải lấy max(Gross, Vol)');
  console.log(`✓ Quy đổi thể tích (D*R*C)/5000: 5kg cân thực -> 12kg thể tích -> tính cước 12kg.`);

  // Test Order creation & Bill issuance
  const initialCount = (await repos.orders.getAllOrders()).length;
  const billCode = repos.orders.getNextBillCode();
  const newOrder = await repos.orders.createOrder({
    id: 'ord-test-1',
    seq: repos.orders.getNextSeq(),
    bill: billCode,
    ref: 'TEST-REF-001',
    cnee: 'Acme Test Corp',
    ct: 'United States',
    route: 'DHL - VN',
    branch: 'TP.HCM',
    created: '28/09/2026 12:00',
    type: 'PACK',
    st: 'wait',
    pcs: '1 kiện · 5.0 kg',
    content: 'Test items',
    track: billCode,
    pod: null,
    photos: 0,
    isLocked: true
  });
  assert.strictEqual(newOrder.bill, billCode);
  assert.strictEqual(newOrder.isLocked, true);
  console.log(`✓ Tạo đơn hàng thành công, cấp mã bill ${billCode}, đơn ở trạng thái khóa.`);

  // Test filtering
  const filterResult = await repos.orders.filterOrders({
    query: 'Acme Test',
    page: 1,
    pageSize: 10
  });
  assert.strictEqual(filterResult.items.length, 1);
  assert.strictEqual(filterResult.items[0].bill, billCode);
  console.log(`✓ Lọc đơn hàng theo từ khóa thành công.`);

  // Test Draft to Order
  const draft = await repos.orders.saveDraft({
    id: 'd-test-1',
    stt: 'ready',
    cnee: 'Draft Receiver',
    ct: 'Japan',
    service: 'Fedex',
    branch: 'Hà Nội',
    ref: 'PO-DRAFT-1',
    pcs: '2 kiện · 10 kg',
    content: 'Electronics',
    date: '28/09/2026 12:15'
  });
  assert.strictEqual(draft.stt, 'ready');

  const printRes = await repos.orders.printDraftAndLock('d-test-1');
  assert.ok(printRes.billCode, 'Phải cấp mã bill khi in');
  assert.strictEqual(printRes.order.isLocked, true, 'Đơn chuyển sang Đơn hàng của tôi và khóa');
  console.log(`✓ In đơn nháp thành công: Cấp mã bill ${printRes.billCode}, khóa đơn.`);

  // Test 4: Ecommerce Module & CSV Parsing
  console.log('\n--- 4. Kiểm tra Module E-Commerce & CSV Import ---');
  const csvSample = `CustomerOrderNo,EcommercePlatformCode,CountryCode,Name,PackageWeight,ItemDescription1
TEST-TIKTOK-1,tiktok,US,John Doe,0.75,Bluetooth Earbuds
TEST-SHOPIFY-2,shopify,SG,Jane Smith,1.5,Cotton T-shirt`;

  const importResult = await repos.ecom.parseAndImportCsv(csvSample);
  assert.strictEqual(importResult.importedCount, 2);
  assert.strictEqual(importResult.errors.length, 0);
  console.log(`✓ Import CSV đơn hàng thành công: ${importResult.importedCount} đơn.`);

  const ecomList = await repos.ecom.getAllOrders('tiktok');
  assert.ok(ecomList.some(o => o.ref === 'TEST-TIKTOK-1'));
  console.log(`✓ Lọc đơn E-com theo sàn TikTok thành công.`);

  // Test 5: Trouble & Incident Management
  console.log('\n--- 5. Kiểm tra Module Trouble (Quản lý sự cố) ---');
  const ticket = await repos.trouble.create({
    bill: billCode,
    cnee: 'Acme Test Corp',
    ct: 'United States',
    type: 'Giao chậm / trễ hẹn',
    lv: 'high',
    desc: 'Hàng chưa phát sau 5 ngày bay',
    req: 'Nguyễn Văn A',
    contact: '0901234567',
    date: '28/09/2026 12:20'
  });
  assert.ok(ticket.id.startsWith('TRB-'));
  assert.strictEqual(ticket.status, 'new');

  const repliedTicket = await repos.trouble.replyTicket(ticket.id, 'CS đã kiểm tra, hàng đang thông quan.', 'doing');
  assert.strictEqual(repliedTicket?.status, 'doing');
  console.log(`✓ Báo cáo sự cố ${ticket.id} và phản hồi CS thành công.`);

  // Test 6: Pickup Scheduling
  console.log('\n--- 6. Kiểm tra Module Pickup (Lấy hàng) ---');
  const pickup = await repos.pickup.create({
    date: '29/09/2026',
    slot: '09:00 – 12:00',
    pcs: 5,
    branch: 'TP.HCM',
    address: '14 Sầm Sơn, Tân Bình'
  });
  assert.strictEqual(pickup.st, 'wait');
  console.log(`✓ Đặt lịch pickup thành công: ${pickup.date} (${pickup.slot}).`);

  // Test 7: Address Book
  console.log('\n--- 7. Kiểm tra Module Address Book (Sổ địa chỉ) ---');
  const senders = await repos.addressBook.getAllSenders();
  assert.ok(senders.length >= 3);
  const newRcv = await repos.addressBook.saveReceiver({
    n: 'GLOBAL TECH CORP',
    ct: 'United States',
    city: 'San Francisco',
    postal: '94105',
    contact: 'Alex Rivera',
    tel: '+1 415 555 9999',
    a1: '500 Howard St'
  });
  assert.ok(newRcv.id);
  console.log(`✓ Lưu sổ địa chỉ người nhận thành công: ${newRcv.n}`);

  // Test 8: Notifications
  console.log('\n--- 8. Kiểm tra Module Notifications (Thông báo) ---');
  const notis = await repos.notifications.getAll();
  assert.ok(notis.length >= 4);
  const unreadBefore = await repos.notifications.getUnreadCount();
  await repos.notifications.markAsRead(notis[0].id);
  const unreadAfter = await repos.notifications.getUnreadCount();
  assert.strictEqual(unreadAfter, unreadBefore - 1);
  console.log(`✓ Đánh dấu thông báo đã đọc thành công.`);

  // Test 9: Heuristic AI Assistant
  console.log('\n--- 9. Kiểm tra Module AI Assistant (Bóc tách thông tin) ---');
  const rawAddress = `Mr. Lim — LINEX CO. LTD
+65 8123 4567 · lim@linex.sg
TAX: SG99887766
1 Raffles Place, #20-01, Tower One
Singapore 238859`;

  const parsed = repos.aiService.parseReceiverText(rawAddress);
  assert.strictEqual(parsed.country, 'Singapore');
  assert.strictEqual(parsed.company, 'LINEX CO. LTD');
  assert.strictEqual(parsed.contact, 'Mr. Lim');
  assert.strictEqual(parsed.email, 'lim@linex.sg');
  assert.strictEqual(parsed.tel, '+65 8123 4567');
  assert.strictEqual(parsed.tax, 'SG99887766');
  assert.strictEqual(parsed.postal, '238859');
  assert.ok(parsed.confidence >= 80, 'Độ tin cậy nhận diện phải >= 80%');
  console.log(`✓ AI Heuristic bóc tách chuẩn xác ${parsed.extractedFieldsCount} trường với độ tin cậy ~${parsed.confidence}%.`);

  console.log('\n================================================================');
  console.log('🎉 TẤT CẢ 9 MODULE ĐÃ VƯỢT QUA KIỂM THỬ 100%!');
  console.log('================================================================\n');
}

runTests().catch(err => {
  console.error('❌ Lỗi kiểm thử:', err);
  process.exit(1);
});
