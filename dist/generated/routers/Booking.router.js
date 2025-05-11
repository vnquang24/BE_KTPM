"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.BookingInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.aggregate(input))),
        createMany: procedure.input($Schema.BookingInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).booking.createMany(input))),
        create: procedure.input($Schema.BookingInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).booking.create(input))),
        deleteMany: procedure.input($Schema.BookingInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).booking.deleteMany(input))),
        delete: procedure.input($Schema.BookingInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).booking.delete(input))),
        findFirst: procedure.input($Schema.BookingInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.BookingInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.BookingInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.findMany(input))),
        findUnique: procedure.input($Schema.BookingInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.BookingInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.BookingInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.groupBy(input))),
        updateMany: procedure.input($Schema.BookingInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).booking.updateMany(input))),
        update: procedure.input($Schema.BookingInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).booking.update(input))),
        upsert: procedure.input($Schema.BookingInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).booking.upsert(input))),
        count: procedure.input($Schema.BookingInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).booking.count(input))),
    });
}
//# sourceMappingURL=Booking.router.js.map