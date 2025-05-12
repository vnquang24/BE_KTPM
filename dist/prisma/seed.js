"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function generateRandomPhone() {
    return '09' + Math.floor(10000000 + Math.random() * 90000000).toString();
}
function generateRandomEmail(username) {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${randomDomain}`;
}
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getRandomIndices(max, count) {
    const indices = Array.from({ length: max }, (_, i) => i);
    for (let i = max - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count);
}
async function main() {
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.maintenanceSchedule.deleteMany();
    await prisma.subField.deleteMany();
    await prisma.openingHours.deleteMany();
    await prisma.field.deleteMany();
    await prisma.owner.deleteMany();
    await prisma.customUser.deleteMany();
    await prisma.account.deleteMany();
    console.log('Đã xóa dữ liệu hiện có');
    const saltRounds = 10;
    const startDate = new Date('1980-01-01');
    const endDate = new Date('2000-12-31');
    const adminAccounts = [];
    const ownerAccounts = [];
    const customerAccounts = [];
    const allAccounts = [];
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
    const ownerRankings = ['Gold', 'Silver', 'Platinum', 'Diamond', 'Standard'];
    const ownerDescriptions = [
        'Chủ sân pickleball hạng Gold với nhiều đánh giá tốt',
        'Chủ sân pickleball hạng Silver với giá cả hợp lý',
        'Chủ chuỗi sân pickleball cao cấp tại Hà Nội',
        'Chủ sân pickleball chuyên nghiệp với HLV quốc tế',
        'Chủ sân pickleball Quận Cầu Giấy',
        'Chủ sân pickleball đạt chuẩn quốc tế',
        'Chủ sân pickleball hạng A',
        'Chủ sân pickleball hạng B',
        'Chủ sân pickleball mới khai trương',
        'Chủ sân pickleball chuyên nghiệp với nhiều năm kinh nghiệm'
    ];
    const owners = [];
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
    const customerDescriptions = [
        'Khách hàng thường xuyên đặt sân pickleball',
        'Khách hàng mới, chưa có lịch sử đặt sân',
        'Khách hàng VIP, thường đặt sân cao cấp',
        'Đại diện câu lạc bộ pickleball, thường đặt sân cho cả đội',
        'Khách hàng ưu tiên, được giảm giá',
        'Khách hàng doanh nghiệp, đặt sân hàng tuần',
        'Khách hàng sinh viên, đặt sân giá rẻ',
        'Khách hàng câu lạc bộ pickleball Hà Nội',
        'Khách hàng đội tuyển pickleball',
        'Khách hàng tổ chức giải đấu pickleball'
    ];
    const customers = [];
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
    const fieldRankings = ['Premium', 'Standard', 'Economy', 'Platinum', 'Diamond', 'Gold', 'Silver'];
    const fieldLocations = [
        'Số 123 Đường Trần Duy Hưng, Quận Cầu Giấy, Hà Nội',
        'Số 456 Đường Nguyễn Chí Thanh, Quận Đống Đa, Hà Nội',
        'Số 789 Đường Láng, Quận Đống Đa, Hà Nội',
        'Số 101 Đường Trường Chinh, Quận Thanh Xuân, Hà Nội',
        'Số 555 Đường Hoàng Quốc Việt, Quận Bắc Từ Liêm, Hà Nội',
        'Số 25 Đường Phạm Hùng, Quận Nam Từ Liêm, Hà Nội',
        'Số 76 Đường Lê Đức Thọ, Quận Nam Từ Liêm, Hà Nội',
        'Số 234 Đường Xuân Thủy, Quận Cầu Giấy, Hà Nội',
        'Số 45 Đường Hoàng Cầu, Quận Đống Đa, Hà Nội',
        'Số 369 Đường Đê La Thành, Quận Đống Đa, Hà Nội',
        'Số 111 Đường Tây Sơn, Quận Đống Đa, Hà Nội',
        'Số 271 Đường Khâm Thiên, Quận Đống Đa, Hà Nội',
        'Số 53 Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội',
        'Số 97 Đường Giải Phóng, Quận Hai Bà Trưng, Hà Nội',
        'Số 156 Đường Minh Khai, Quận Hai Bà Trưng, Hà Nội'
    ];
    const fieldDescriptions = [
        'Sân pickleball cao cấp với đầy đủ tiện nghi, phòng thay đồ rộng rãi, có bãi đậu xe',
        'Sân pickleball tiêu chuẩn với giá cả phải chăng, phù hợp cho người mới chơi',
        'Sân pickleball chất lượng cao tại khu vực Cầu Giấy, có hệ thống chiếu sáng hiện đại',
        'Sân pickleball giá rẻ, phù hợp cho sinh viên và học sinh',
        'Sân pickleball trong nhà, đạt chuẩn quốc tế, có điều hòa',
        'Sân pickleball rộng rãi, phục vụ các giải đấu cấp quận',
        'Sân pickleball và tennis tổng hợp, phù hợp nhiều đối tượng',
        'Sân pickleball đa năng, có các dịch vụ đi kèm như nhà hàng, khu giải khát',
        'Sân pickleball trong nhà, có hệ thống điều hòa, chỉ nhận khách đặt trước',
        'Sân pickleball mới xây, mặt sân cao su đặc biệt chống trơn trượt',
        'Sân pickleball tiêu chuẩn, có huấn luyện viên chuyên nghiệp',
        'Sân pickleball kinh doanh nhiều năm, có khách hàng trung thành',
        'Sân pickleball cho người mới, có lớp dạy kỹ thuật cơ bản',
        'Sân pickleball chuyên nghiệp, đạt tiêu chuẩn thi đấu',
        'Sân pickleball ngoài trời, phục vụ các đội từ phong trào đến chuyên nghiệp'
    ];
    const numberOfFields = Math.floor(Math.random() * 6) + 20;
    const fields = [];
    const randomLocations = [...fieldLocations];
    for (let i = 0; i < numberOfFields; i++) {
        const ownerIndex = i < owners.length ? i : Math.floor(Math.random() * owners.length);
        const locationIndex = Math.floor(Math.random() * randomLocations.length);
        const location = randomLocations.splice(locationIndex, 1)[0];
        if (!location)
            break;
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
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const subfieldRankings = ['Premium', 'Standard', 'Economy', 'Platinum', 'Diamond', 'Gold', 'Silver'];
    const prices = [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000];
    const statuses = ['AVAILABLE', 'MAINTENANCE', 'CLOSED', 'RESERVED'];
    const subfieldDescriptions = [
        'Sân pickleball đơn, mặt sân cao cấp, có hệ thống làm mát',
        'Sân pickleball đôi, mặt sân cao cấp, có hệ thống làm mát',
        'Sân pickleball tournament, đạt chuẩn quốc tế, đang bảo trì',
        'Sân pickleball đơn, mặt sân tiêu chuẩn',
        'Sân pickleball đôi, mặt sân tiêu chuẩn',
        'Sân pickleball đôi, mặt sân cao cấp, có hệ thống chiếu sáng hiện đại',
        'Sân pickleball giá rẻ dành cho sinh viên',
        'Sân pickleball đơn, mặt sân cao cấp',
        'Sân pickleball đôi, mặt sân cao cấp',
        'Sân pickleball đơn, dành cho người mới',
        'Sân pickleball đôi, dành cho người có kinh nghiệm',
        'Sân pickleball tập luyện cho trẻ em',
        'Sân pickleball thi đấu chuyên nghiệp',
        'Sân pickleball ngoài trời',
        'Sân pickleball trong nhà'
    ];
    const subfieldNames = [
        'Sân pickleball số 1 - Khu A',
        'Sân pickleball số 2 - Khu A',
        'Sân pickleball số 3 - Khu A',
        'Sân pickleball số 1 - Khu B',
        'Sân pickleball số 2 - Khu B',
        'Sân pickleball số 1 - Khu C',
        'Sân pickleball sinh viên 1',
        'Sân pickleball đơn 1',
        'Sân pickleball đôi 1',
        'Sân pickleball trong nhà 1',
        'Sân pickleball ngoài trời 1',
        'Sân pickleball chuyên nghiệp',
        'Sân pickleball giải đấu',
        'Sân pickleball tập luyện',
        'Sân pickleball đa năng'
    ];
    const subfields = [];
    for (const field of fields) {
        const numberOfSubfields = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < numberOfSubfields; i++) {
            let randomStatus;
            const statusRandom = Math.random();
            if (statusRandom < 0.7) {
                randomStatus = 'AVAILABLE';
            }
            else if (statusRandom < 0.85) {
                randomStatus = 'MAINTENANCE';
            }
            else if (statusRandom < 0.95) {
                randomStatus = 'CLOSED';
            }
            else {
                randomStatus = 'RESERVED';
            }
            const subfield = await prisma.subField.create({
                data: {
                    ranking: getRandomItem(subfieldRankings),
                    price: getRandomItem(prices),
                    status: randomStatus,
                    haveToPayFirst: Math.random() > 0.5,
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
    const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const openingTimes = ['06:00', '07:00', '08:00', '09:00'];
    const closingTimes = ['20:00', '21:00', '22:00', '23:00'];
    for (const field of fields) {
        for (const day of daysOfWeek) {
            let openTime, closeTime;
            if (day === 'SUNDAY') {
                openTime = getRandomItem(['08:00', '09:00', '10:00']);
                closeTime = getRandomItem(['18:00', '19:00', '20:00']);
            }
            else {
                openTime = getRandomItem(openingTimes);
                closeTime = getRandomItem(closingTimes);
            }
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
    const maintenanceStatuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
    const maintenanceReasons = [
        'Bảo trì định kỳ mặt sân pickleball',
        'Sửa chữa mặt sân sau giải đấu',
        'Thay thế lưới và dụng cụ',
        'Nâng cấp hệ thống đèn LED',
        'Cải tạo phòng thay đồ',
        'Sơn vạch kẻ sân pickleball',
        'Vệ sinh và bảo dưỡng lớn',
        'Kiểm tra an toàn và tiêu chuẩn thi đấu'
    ];
    const maintenanceSubfields = subfields.filter(sf => sf.status === 'MAINTENANCE');
    for (const subfield of maintenanceSubfields) {
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 15) - 1);
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
    const subfieldsByStatus = subfields.reduce((acc, sf) => {
        if (!acc[sf.status])
            acc[sf.status] = [];
        acc[sf.status].push(sf);
        return acc;
    }, {});
    const readySubfields = subfieldsByStatus['AVAILABLE'] || [];
    const completedMaintenanceCount = Math.floor(readySubfields.length * 0.3);
    const subfieldsForCompletedMaintenance = readySubfields.slice(0, completedMaintenanceCount);
    for (const subfield of subfieldsForCompletedMaintenance) {
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() - Math.floor(Math.random() * 60) - 1);
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10) - 1);
        await prisma.maintenanceSchedule.create({
            data: {
                startDate,
                endDate,
                reason: getRandomItem(maintenanceReasons),
                status: 'completed',
                subfieldId: subfield.id,
                description: `Bảo trì đã hoàn thành cho sân ${subfield.subfieldDescription}`
            }
        });
    }
    const futureMaintenanceCount = Math.floor(readySubfields.length * 0.2);
    const subfieldsForFutureMaintenance = readySubfields.slice(completedMaintenanceCount, completedMaintenanceCount + futureMaintenanceCount);
    for (const subfield of subfieldsForFutureMaintenance) {
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 1);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 15) + 1);
        await prisma.maintenanceSchedule.create({
            data: {
                startDate,
                endDate,
                reason: getRandomItem(maintenanceReasons),
                status: 'scheduled',
                subfieldId: subfield.id,
                description: `Lịch bảo trì dự kiến cho sân ${subfield.subfieldDescription}`
            }
        });
    }
    console.log('Đã tạo dữ liệu lịch bảo trì');
    const bookingStatuses = ['pending', 'paid', 'cancel'];
    const paymentMethods = ['banking', 'cash', 'momo', 'zalo pay', 'credit card'];
    const bookingDescriptions = [
        'Đặt sân pickleball cho đội công ty',
        'Đặt sân pickleball cho nhóm bạn',
        'Đặt sân pickleball cho nhóm VIP',
        'Đặt sân nhưng hủy vì lý do cá nhân',
        'Đặt sân pickleball cho giải đấu nội bộ công ty',
        'Đặt sân pickleball đôi cho giải đấu',
        'Đặt sân pickleball cho nhóm sinh viên',
        'Đặt sân tập huấn đội pickleball',
        'Đặt sân hàng tuần cho CLB pickleball Hà Nội',
        'Đặt sân cho giải đấu pickleball nội bộ',
        'Đặt sân cho sự kiện kết nối doanh nghiệp qua pickleball',
        'Đặt sân tổ chức sinh nhật với hoạt động pickleball',
        'Đặt sân tập luyện pickleball thường xuyên'
    ];
    const numberOfBookings = Math.floor(Math.random() * 51) + 50;
    const bookings = [];
    const availableSubfields = subfields.filter(sf => sf.status === 'AVAILABLE');
    for (let i = 0; i < numberOfBookings; i++) {
        const twoWeeksAgo = new Date(today);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const twoWeeksLater = new Date(today);
        twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
        const bookingDate = randomDate(twoWeeksAgo, twoWeeksLater);
        const startHour = Math.floor(Math.random() * 15) + 6;
        const duration = Math.floor(Math.random() * 3) + 1;
        const beginTime = new Date(bookingDate);
        beginTime.setHours(startHour, 0, 0);
        const endTime = new Date(bookingDate);
        endTime.setHours(startHour + duration, 0, 0);
        const customer = getRandomItem(customers);
        const subfield = getRandomItem(availableSubfields);
        let status;
        const rand = Math.random();
        if (rand < 0.6) {
            status = 'paid';
        }
        else if (rand < 0.9) {
            status = 'pending';
        }
        else {
            status = 'cancel';
        }
        let payDate;
        let paymentMethod;
        if (status === 'paid') {
            const paymentDate = new Date(bookingDate);
            paymentDate.setDate(paymentDate.getDate() - Math.floor(Math.random() * 3));
            payDate = paymentDate;
            paymentMethod = getRandomItem(paymentMethods);
        }
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
    const reviewTexts = [
        'Sân pickleball rất tốt, mặt sân chất lượng, nhân viên thân thiện, sẽ quay lại lần sau',
        'Sân pickleball tốt, phòng thay đồ hơi nhỏ, hệ thống chiếu sáng tốt',
        'Sân pickleball ở mức trung bình, giá hơi cao so với chất lượng',
        'Dịch vụ rất tốt, nhân viên nhiệt tình và thân thiện',
        'Sân pickleball đẹp, sạch sẽ, thích hợp cho mọi trình độ',
        'Mặt sân chất lượng cao, rất thoải mái khi thi đấu pickleball',
        'Vị trí thuận tiện, dễ dàng tìm kiếm, có bãi đậu xe rộng rãi',
        'Giá cả hợp lý, chất lượng sân pickleball tương xứng với giá tiền',
        'Đội ngũ huấn luyện viên pickleball chuyên nghiệp, luôn hỗ trợ khi cần thiết',
        'Sân và vợt pickleball đầy đủ, mới và sạch sẽ'
    ];
    const paidPastBookings = bookings.filter(b => b.status === 'paid' && new Date(b.date) < today);
    const bookingsToReview = paidPastBookings.slice(0, Math.floor(paidPastBookings.length * 0.3));
    for (const booking of bookingsToReview) {
        const reviewDate = new Date(booking.date);
        reviewDate.setDate(reviewDate.getDate() + Math.floor(Math.random() * 3));
        const rating = Math.floor(Math.random() * 3) + 3;
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
//# sourceMappingURL=seed.js.map