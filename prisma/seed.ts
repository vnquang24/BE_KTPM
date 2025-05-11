import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Hàm tạo ngày ngẫu nhiên trong khoảng
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Hàm tạo số điện thoại ngẫu nhiên
function generateRandomPhone(): string {
  return '09' + Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Hàm tạo email ngẫu nhiên
function generateRandomEmail(username: string): string {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${randomDomain}`;
}

// Hàm lấy phần tử ngẫu nhiên từ mảng
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Hàm tạo mảng ngẫu nhiên các chỉ số không trùng nhau
function getRandomIndices(max: number, count: number): number[] {
  const indices = Array.from({ length: max }, (_, i) => i);
  // Thuật toán Fisher-Yates shuffle
  for (let i = max - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

async function main() {
  // Xóa dữ liệu hiện có
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.subField.deleteMany();
  await prisma.field.deleteMany();
  await prisma.owner.deleteMany();
  await prisma.customUser.deleteMany();
  await prisma.account.deleteMany();

  console.log('Đã xóa dữ liệu hiện có');

  // Tạo dữ liệu người dùng với mật khẩu đã được băm
  const saltRounds = 10;
  const startDate = new Date('1980-01-01');
  const endDate = new Date('2000-12-31');

  // Mảng lưu trữ các tài khoản đã tạo
  const adminAccounts: any[] = [];
  const ownerAccounts: any[] = [];
  const customerAccounts: any[] = [];
  const allAccounts: any[] = [];
  
  // Tạo tài khoản admin (3 tài khoản)
  for (let i = 1; i <= 3; i++) {
    const username = `admin${i}`;
    const adminAccount = await prisma.account.create({
      data: {
        username,
        password: await bcrypt.hash('1', saltRounds),
        phone: generateRandomPhone(),
        email: generateRandomEmail(username),
        dateOfBirth: randomDate(startDate, endDate),
        role: 'ADMIN',
        description: `Tài khoản quản trị viên hệ thống ${i}`
      }
    });
    adminAccounts.push(adminAccount);
    allAccounts.push(adminAccount);
  }

  console.log('Đã tạo tài khoản admin');

  // Tạo tài khoản chủ sân (10 chủ sân)
  for (let i = 1; i <= 10; i++) {
    const username = `owner${i}`;
    const ownerAccount = await prisma.account.create({
      data: {
        username,
        password: await bcrypt.hash('1', saltRounds),
        phone: generateRandomPhone(),
        email: generateRandomEmail(username),
        dateOfBirth: randomDate(startDate, endDate),
        role: 'OWNER',
        description: `Chủ sân ${i}`
      }
    });
    ownerAccounts.push(ownerAccount);
    allAccounts.push(ownerAccount);
  }

  // Tạo tài khoản người dùng (30 khách hàng)
  const userDescriptions = [
    'Khách hàng thường xuyên',
    'Khách hàng mới',
    'Khách hàng VIP',
    'Đại diện đội bóng',
    'Khách hàng sinh viên',
    'Khách hàng doanh nghiệp',
    'Khách hàng cao cấp',
    'Khách hàng đoàn đội',
    'Khách hàng đặt sân hàng tháng',
    'Khách hàng tiềm năng'
  ];

  for (let i = 1; i <= 30; i++) {
    const username = `user${i}`;
    const customerAccount = await prisma.account.create({
      data: {
        username,
        password: await bcrypt.hash('1', saltRounds),
        phone: generateRandomPhone(),
        email: generateRandomEmail(username),
        dateOfBirth: randomDate(startDate, endDate),
        role: 'CUSTOMER',
        description: getRandomItem(userDescriptions)
      }
    });
    customerAccounts.push(customerAccount);
    allAccounts.push(customerAccount);
  }

  console.log('Đã tạo các tài khoản');

  // Tạo dữ liệu chủ sân
  const ownerRankings = ['Gold', 'Silver', 'Platinum', 'Diamond', 'Standard'];
  const ownerDescriptions = [
    'Chủ sân hạng Gold với nhiều đánh giá tốt',
    'Chủ sân hạng Silver với giá cả hợp lý',
    'Chủ sân tennis cao cấp',
    'Chủ sân bóng đá chuyên nghiệp',
    'Chủ sân quận 7',
    'Chủ sân thể thao đa năng',
    'Chủ sân hạng A',
    'Chủ sân hạng B',
    'Chủ sân mới khai trương',
    'Chủ sân chuyên nghiệp'
  ];
  
  const owners: any[] = [];
  for (let i = 0; i < ownerAccounts.length; i++) {
    const owner = await prisma.owner.create({
      data: {
        ranking: getRandomItem(ownerRankings),
        description: getRandomItem(ownerDescriptions),
        accountId: ownerAccounts[i].id
      }
    });
    owners.push(owner);
  }

  console.log('Đã tạo dữ liệu chủ sân');

  // Tạo dữ liệu khách hàng
  const customerDescriptions = [
    'Khách hàng thường xuyên đặt sân bóng đá',
    'Khách hàng mới, chưa có lịch sử đặt sân',
    'Khách hàng VIP, thường đặt sân cao cấp',
    'Đại diện đội bóng, thường đặt sân cho cả đội',
    'Khách hàng ưu tiên, được giảm giá',
    'Khách hàng doanh nghiệp, đặt sân hàng tuần',
    'Khách hàng sinh viên, đặt sân giá rẻ',
    'Khách hàng hội thể thao',
    'Khách hàng CLB bóng đá',
    'Khách hàng tổ chức giải đấu'
  ];
  
  const customers: any[] = [];
  for (let i = 0; i < customerAccounts.length; i++) {
    const customer = await prisma.customUser.create({
      data: {
        accountId: customerAccounts[i].id,
        description: getRandomItem(customerDescriptions)
      }
    });
    customers.push(customer);
  }

  console.log('Đã tạo dữ liệu khách hàng');

  // Tạo dữ liệu sân
  const fieldRankings = ['Premium', 'Standard', 'Economy', 'Platinum', 'Diamond', 'Gold', 'Silver'];
  const fieldLocations = [
    'Số 123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
    'Số 456 Đường Lê Văn Lương, Quận 7, TP.HCM',
    'Số 789 Đường Phạm Văn Đồng, Quận Thủ Đức, TP.HCM',
    'Số 101 Đường Lý Thường Kiệt, Quận 10, TP.HCM',
    'Số 555 Đường Trần Hưng Đạo, Quận 1, TP.HCM',
    'Số 25 Đường Trường Sa, Quận Bình Thạnh, TP.HCM',
    'Số 76 Đường Phạm Văn Bạch, Quận Tân Bình, TP.HCM',
    'Số 234 Đường Phan Huy Ích, Quận Gò Vấp, TP.HCM',
    'Số 45 Đường Đinh Tiên Hoàng, Quận 1, TP.HCM',
    'Số 369 Đường Cộng Hòa, Quận Tân Bình, TP.HCM',
    'Số 111 Đường Bình Quới, Quận Thủ Đức, TP.HCM',
    'Số 271 Đường An Dương Vương, Quận 5, TP.HCM',
    'Số 53 Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
    'Số 97 Đường Nguyễn Hữu Cảnh, Quận Bình Thạnh, TP.HCM',
    'Số 156 Đường Nguyễn Văn Thủ, Quận 1, TP.HCM'
  ];
  
  const fieldDescriptions = [
    'Sân bóng đá cao cấp với đầy đủ tiện nghi, phòng thay đồ rộng rãi, có bãi đậu xe',
    'Sân bóng đá tiêu chuẩn với giá cả phải chăng, phù hợp cho các đội bóng nghiệp dư',
    'Sân bóng đá chất lượng cao tại khu vực Thủ Đức, có hệ thống chiếu sáng hiện đại',
    'Sân bóng đá giá rẻ, phù hợp cho sinh viên và học sinh',
    'Sân tennis cao cấp với mặt sân đạt chuẩn quốc tế',
    'Sân bóng đá rộng rãi, phục vụ các giải đấu cấp quận',
    'Sân bóng đá và bóng rổ tổng hợp, phù hợp nhiều môn thể thao',
    'Sân thể thao đa năng, có các dịch vụ đi kèm như nhà hàng, khu giải khát',
    'Sân bóng đá trong nhà, có hệ thống điều hòa, chỉ nhận khách đặt trước',
    'Sân bóng đá mới xây, cỏ nhân tạo tiêu chuẩn FIFA',
    'Sân tennis tiêu chuẩn, có huấn luyện viên chuyên nghiệp',
    'Sân thể thao kinh doanh nhiều năm, có khách hàng trung thành',
    'Sân bóng đá cho trẻ em, có lớp dạy bóng đá cơ bản',
    'Sân cầu lông chuyên nghiệp, đạt tiêu chuẩn thi đấu',
    'Sân bóng rổ ngoài trời, phục vụ các đội từ phong trào đến chuyên nghiệp'
  ];

  // Tạo khoảng 20-25 sân
  const numberOfFields = Math.floor(Math.random() * 6) + 20; // 20-25 sân
  const fields: any[] = [];
  
  // Chọn ngẫu nhiên vị trí địa điểm không trùng nhau cho các sân
  const randomLocations = [...fieldLocations];
  for (let i = 0; i < numberOfFields; i++) {
    // Đảm bảo mỗi chủ sân có ít nhất 1 sân
    const ownerIndex = i < owners.length ? i : Math.floor(Math.random() * owners.length);
    
    // Chọn ngẫu nhiên vị trí sân
    const locationIndex = Math.floor(Math.random() * randomLocations.length);
    const location = randomLocations.splice(locationIndex, 1)[0]; // Lấy và xóa vị trí đã chọn
    
    if (!location) break; // Nếu hết địa điểm thì dừng
    
    const field = await prisma.field.create({
      data: {
        ranking: getRandomItem(fieldRankings),
        location: location,
        fieldDescription: getRandomItem(fieldDescriptions),
        ownerId: owners[ownerIndex].id
      }
    });
    fields.push(field);
  }

  console.log('Đã tạo dữ liệu sân');

  // Khai báo các biến ngày tháng sử dụng trong cả seed (di chuyển lên trước để tránh lỗi sử dụng trước khi khai báo)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  // Tạo dữ liệu sân con
  const subfieldRankings = ['Premium', 'Standard', 'Economy', 'Platinum', 'Diamond', 'Gold', 'Silver'];
  const prices = [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000];
  // Cần sử dụng chính xác các giá trị enum từ schema.prisma (chữ viết hoa)
  const statuses = ['AVAILABLE', 'MAINTENANCE', 'CLOSED', 'RESERVED'] as const;
  
  const subfieldDescriptions = [
    'Sân 5 người, cỏ nhân tạo cao cấp, có hệ thống làm mát',
    'Sân 7 người, cỏ nhân tạo cao cấp, có hệ thống làm mát',
    'Sân 11 người, cỏ nhân tạo cao cấp, đang bảo trì',
    'Sân 5 người, cỏ nhân tạo tiêu chuẩn',
    'Sân 7 người, cỏ nhân tạo tiêu chuẩn',
    'Sân 7 người, cỏ nhân tạo cao cấp, có hệ thống chiếu sáng hiện đại',
    'Sân 5 người, giá rẻ dành cho sinh viên',
    'Sân tennis đơn, mặt sân cao cấp',
    'Sân tennis đôi, mặt sân cao cấp',
    'Sân cầu lông đơn',
    'Sân cầu lông đôi',
    'Sân tập luyện cho trẻ em',
    'Sân thi đấu chuyên nghiệp',
    'Sân bóng rổ ngoài trời',
    'Sân bóng rổ trong nhà'
  ];
  
  const subfieldNames = [
    'Sân số 1 - Khu A',
    'Sân số 2 - Khu A',
    'Sân số 3 - Khu A',
    'Sân số 1 - Khu B',
    'Sân số 2 - Khu B',
    'Sân số 1 - Khu C',
    'Sân sinh viên 1',
    'Sân tennis 1',
    'Sân tennis 2',
    'Sân trong nhà 1',
    'Sân ngoài trời 1',
    'Sân chuyên nghiệp',
    'Sân giải đấu',
    'Sân tập luyện',
    'Sân thế dục'
  ];

  const subfields: any[] = [];
  
  // Tạo 2-5 sân con cho mỗi sân
  for (const field of fields) {
    // Số lượng sân con từ 2-5 cho mỗi sân
    const numberOfSubfields = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < numberOfSubfields; i++) {
      // Tạo ngẫu nhiên trạng thái trong số các trạng thái có sẵn
      let randomStatus;
      const statusRandom = Math.random();
      if (statusRandom < 0.7) {
        randomStatus = 'AVAILABLE'; // 70% là AVAILABLE
      } else if (statusRandom < 0.85) {
        randomStatus = 'MAINTENANCE'; // 15% là MAINTENANCE
      } else if (statusRandom < 0.95) {
        randomStatus = 'CLOSED'; // 10% là CLOSED
      } else {
        randomStatus = 'RESERVED'; // 5% là RESERVED
      }

      const subfield = await prisma.subField.create({
        data: {
          ranking: getRandomItem(subfieldRankings),
          price: getRandomItem(prices),
          status: randomStatus,
          haveToPayFirst: Math.random() > 0.5, // 50% khả năng yêu cầu thanh toán trước
          description: getRandomItem(subfieldDescriptions),
          fieldId: field.id,
          subfieldDescription: `${getRandomItem(subfieldNames)} - ${i + 1}`,
          unitOfTime: 'Giờ'
        }
      });
      subfields.push(subfield);
    }
  }

  console.log('Đã tạo dữ liệu sân con');

  // Tạo dữ liệu thời gian mở cửa (OpeningHours)
  // Sử dụng đúng kiểu DayOfWeek từ schema
  const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const;
  const openingTimes = ['06:00', '07:00', '08:00', '09:00'];
  const closingTimes = ['20:00', '21:00', '22:00', '23:00'];

  // Tạo dữ liệu thời gian mở cửa cho mỗi sân
  for (const field of fields) {
    // Tạo lịch mở cửa cho cả 7 ngày trong tuần
    for (const day of daysOfWeek) {
      // Ngày chủ nhật có thể mở cửa muộn hơn và đóng sớm hơn
      let openTime, closeTime;
      if (day === 'SUNDAY') {
        openTime = getRandomItem(['08:00', '09:00', '10:00']);
        closeTime = getRandomItem(['18:00', '19:00', '20:00']);
      } else {
        openTime = getRandomItem(openingTimes);
        closeTime = getRandomItem(closingTimes);
      }

      // Có xác suất 10% sân sẽ đóng cửa vào một ngày nào đó
      const isOpen = Math.random() > 0.1;

      await prisma.openingHours.create({
        data: {
          dayOfWeek: day,
          openTime,
          closeTime,
          isOpen,
          fieldId: field.id,
          description: `Giờ mở cửa ${day}`
        }
      });
    }
  }

  console.log('Đã tạo dữ liệu thời gian mở cửa');

  // Tạo dữ liệu lịch bảo trì (MaintenanceSchedule)
  const maintenanceStatuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
  const maintenanceReasons = [
    'Bảo trì định kỳ',
    'Sửa chữa mặt sân',
    'Thay thế thiết bị',
    'Nâng cấp hệ thống đèn',
    'Cải tạo phòng thay đồ',
    'Sơn vạch kẻ sân',
    'Dọn dẹp lớn',
    'Kiểm tra an toàn'  
  ];

  // Lọc các sân con đang trong trạng thái bảo trì
  const maintenanceSubfields = subfields.filter(sf => sf.status === 'MAINTENANCE');
  
  // Tạo lịch bảo trì cho những sân đang trong trạng thái bảo trì
  for (const subfield of maintenanceSubfields) {
    // Ngày bắt đầu bảo trì từ 1-15 ngày trước
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 15) - 1);
    
    // Bảo trì kéo dài 1-30 ngày
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    await prisma.maintenanceSchedule.create({
      data: {
        startDate,
        endDate,
        reason: getRandomItem(maintenanceReasons),
        status: getRandomItem(maintenanceStatuses),
        subfieldId: subfield.id,
        description: `Lịch bảo trì sân ${subfield.subfieldDescription}`
      }
    });
  }
  
  // Tạo thêm một số lịch bảo trì đã hoàn thành cho các sân hiện đang hoạt động
  const subfieldsByStatus = subfields.reduce((acc, sf) => {
    if (!acc[sf.status]) acc[sf.status] = [];
    acc[sf.status].push(sf);
    return acc;
  }, {} as Record<string, any[]>);
  
  const readySubfields = subfieldsByStatus['AVAILABLE'] || [];
  
  // Chọn ngẫu nhiên 30% số sân để tạo lịch bảo trì đã hoàn thành
  const completedMaintenanceCount = Math.floor(readySubfields.length * 0.3);
  const subfieldsForCompletedMaintenance = readySubfields.slice(0, completedMaintenanceCount);
  
  for (const subfield of subfieldsForCompletedMaintenance) {
    // Bảo trì đã kết thúc 1-60 ngày trước
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() - Math.floor(Math.random() * 60) - 1);
    
    // Bảo trì kéo dài 1-10 ngày
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10) - 1);
    
    await prisma.maintenanceSchedule.create({
      data: {
        startDate,
        endDate,
        reason: getRandomItem(maintenanceReasons),
        status: 'completed', // Đã hoàn thành
        subfieldId: subfield.id,
        description: `Bảo trì đã hoàn thành cho sân ${subfield.subfieldDescription}`
      }
    });
  }
  
  // Tạo thêm một số lịch bảo trì dự kiến trong tương lai
  const futureMaintenanceCount = Math.floor(readySubfields.length * 0.2);
  const subfieldsForFutureMaintenance = readySubfields.slice(completedMaintenanceCount, completedMaintenanceCount + futureMaintenanceCount);
  
  for (const subfield of subfieldsForFutureMaintenance) {
    // Bảo trì dự kiến bắt đầu 1-30 ngày từ hôm nay
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    // Bảo trì dự kiến kéo dài 1-15 ngày
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 15) + 1);
    
    await prisma.maintenanceSchedule.create({
      data: {
        startDate,
        endDate,
        reason: getRandomItem(maintenanceReasons),
        status: 'scheduled', // Đã lên lịch
        subfieldId: subfield.id,
        description: `Lịch bảo trì dự kiến cho sân ${subfield.subfieldDescription}`
      }
    });
  }

  console.log('Đã tạo dữ liệu lịch bảo trì');

  // Tạo dữ liệu đặt sân
  
  const bookingStatuses = ['pending', 'paid', 'cancel'];
  const paymentMethods = ['banking', 'cash', 'momo', 'zalo pay', 'credit card'];
  const bookingDescriptions = [
    'Đặt sân cho đội bóng công ty',
    'Đặt sân cho nhóm bạn',
    'Đặt sân cho nhóm VIP',
    'Đặt sân nhưng hủy vì lý do cá nhân',
    'Đặt sân tennis cho giải đấu công ty',
    'Đặt sân tennis đôi cho giải đấu',
    'Đặt sân cho đội bóng sinh viên',
    'Đặt sân tập huấn đội bóng',
    'Đặt sân hàng tuần cho CLB bóng đá',
    'Đặt sân cho giải đấu nội bộ',
    'Đặt sân cho sự kiện kết nối doanh nghiệp',
    'Đặt sân tổ chức sinh nhật',
    'Đặt sân tập luyện thường xuyên'
  ];
  
  // Tạo ngẫu nhiên khoảng 50-100 booking
  const numberOfBookings = Math.floor(Math.random() * 51) + 50; // 50-100 bookings
  const bookings: any[] = [];
  
  // Chọn ngẫu nhiên các sân con có trạng thái AVAILABLE
  const availableSubfields = subfields.filter(sf => sf.status === 'AVAILABLE');
  
  for (let i = 0; i < numberOfBookings; i++) {
    // Chọn ngẫu nhiên ngày đặt sân (trong khoảng từ 2 tuần trước đến 2 tuần sau)
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    
    const bookingDate = randomDate(twoWeeksAgo, twoWeeksLater);
    
    // Tạo ngẫu nhiên giờ bắt đầu và kết thúc (giờ bắt đầu từ 6h-20h, thời gian đặt từ 1-3 giờ)
    const startHour = Math.floor(Math.random() * 15) + 6; // 6h-20h
    const duration = Math.floor(Math.random() * 3) + 1; // 1-3 giờ
    
    const beginTime = new Date(bookingDate);
    beginTime.setHours(startHour, 0, 0);
    
    const endTime = new Date(bookingDate);
    endTime.setHours(startHour + duration, 0, 0);
    
    // Chọn ngẫu nhiên khách hàng và sân con
    const customer = getRandomItem(customers);
    const subfield = getRandomItem(availableSubfields);
    
    // Xác định trạng thái booking: tỷ lệ 60% paid, 30% pending, 10% cancel
    let status: string;
    const rand = Math.random();
    if (rand < 0.6) {
      status = 'paid';
    } else if (rand < 0.9) {
      status = 'pending';
    } else {
      status = 'cancel';
    }
    
    // Nếu status là paid, tạo ngày thanh toán và phương thức thanh toán
    let payDate: Date | undefined;
    let paymentMethod: string | undefined;
    
    if (status === 'paid') {
      // Ngày thanh toán trước ngày đặt sân
      const paymentDate = new Date(bookingDate);
      paymentDate.setDate(paymentDate.getDate() - Math.floor(Math.random() * 3)); // 0-2 ngày trước
      payDate = paymentDate;
      paymentMethod = getRandomItem(paymentMethods);
    }
    
    // Giá phụ thuộc vào sân con và thời gian đặt
    const price = subfield.price * duration;
    
    const booking = await prisma.booking.create({
      data: {
        date: bookingDate,
        beginTime,
        endTime,
        price,
        payDate,
        paymentMethod,
        status,
        customUserId: customer.id,
        subfieldId: subfield.id,
        description: getRandomItem(bookingDescriptions)
      }
    });
    
    bookings.push(booking);
  }

  console.log('Đã tạo dữ liệu đặt sân');

  // Tạo dữ liệu đánh giá
  const reviewTexts = [
    'Sân rất tốt, mặt cỏ đẹp, nhân viên thân thiện, sẽ quay lại lần sau',
    'Sân tốt, phòng thay đồ hơi nhỏ, hệ thống chiếu sáng tốt',
    'Sân ở mức trung bình, giá hơi cao so với chất lượng',
    'Dịch vụ rất tốt, nhân viên nhiệt tình và thân thiện',
    'Sân đẹp, sạch sẽ, thích hợp cho các hoạt động thể thao',
    'Mặt sân chất lượng cao, rất thoải mái khi thi đấu',
    'Vị trí thuận tiện, dễ dàng tìm kiếm, có bãi đậu xe rộng rãi',
    'Giá cả hợp lý, chất lượng sân tương xứng với giá tiền',
    'Đội ngũ nhân viên chuyên nghiệp, luôn hỗ trợ khi cần thiết',
    'Các thiết bị đầy đủ, mới và sạch sẽ'
  ];
  
  // Tạo đánh giá cho khoảng 30% số booking đã thanh toán và trong quá khứ
  const paidPastBookings = bookings.filter(b => 
    b.status === 'paid' && new Date(b.date) < today
  );
  
  // Chọn ngẫu nhiên 30% số booking đã thanh toán để đánh giá
  const bookingsToReview = paidPastBookings.slice(0, Math.floor(paidPastBookings.length * 0.3));
  
  for (const booking of bookingsToReview) {
    // Tạo ngày đánh giá sau ngày đặt sân 0-2 ngày
    const reviewDate = new Date(booking.date);
    reviewDate.setDate(reviewDate.getDate() + Math.floor(Math.random() * 3));
    
    // Đánh giá từ 3-5 sao (phần lớn là đánh giá tốt)
    const rating = Math.floor(Math.random() * 3) + 3; // 3-5 sao
    
    await prisma.review.create({
      data: {
        date: reviewDate,
        rating,
        text: getRandomItem(reviewTexts),
        bookingId: booking.id
      }
    });
  }

  console.log('Đã tạo dữ liệu đánh giá');
  console.log('Đã hoàn thành tạo dữ liệu mẫu');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Lỗi khi tạo dữ liệu mẫu:', e);
    await prisma.$disconnect();
    process.exit(1);
  });