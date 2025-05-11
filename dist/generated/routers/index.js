"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = db;
exports.createRouter = createRouter;
const Account_router_1 = require("./Account.router");
const CustomUser_router_1 = require("./CustomUser.router");
const Owner_router_1 = require("./Owner.router");
const Field_router_1 = require("./Field.router");
const SubField_router_1 = require("./SubField.router");
const Booking_router_1 = require("./Booking.router");
const Review_router_1 = require("./Review.router");
const OpeningHours_router_1 = require("./OpeningHours.router");
const MaintenanceSchedule_router_1 = require("./MaintenanceSchedule.router");
function db(ctx) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma;
}
function createRouter(router, procedure) {
    return router({
        account: (0, Account_router_1.default)(router, procedure),
        customUser: (0, CustomUser_router_1.default)(router, procedure),
        owner: (0, Owner_router_1.default)(router, procedure),
        field: (0, Field_router_1.default)(router, procedure),
        subField: (0, SubField_router_1.default)(router, procedure),
        booking: (0, Booking_router_1.default)(router, procedure),
        review: (0, Review_router_1.default)(router, procedure),
        openingHours: (0, OpeningHours_router_1.default)(router, procedure),
        maintenanceSchedule: (0, MaintenanceSchedule_router_1.default)(router, procedure),
    });
}
//# sourceMappingURL=index.js.map