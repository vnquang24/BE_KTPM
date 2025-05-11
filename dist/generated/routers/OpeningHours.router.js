"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.OpeningHoursInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.aggregate(input))),
        createMany: procedure.input($Schema.OpeningHoursInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).openingHours.createMany(input))),
        create: procedure.input($Schema.OpeningHoursInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).openingHours.create(input))),
        deleteMany: procedure.input($Schema.OpeningHoursInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).openingHours.deleteMany(input))),
        delete: procedure.input($Schema.OpeningHoursInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).openingHours.delete(input))),
        findFirst: procedure.input($Schema.OpeningHoursInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.OpeningHoursInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.OpeningHoursInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.findMany(input))),
        findUnique: procedure.input($Schema.OpeningHoursInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.OpeningHoursInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.OpeningHoursInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.groupBy(input))),
        updateMany: procedure.input($Schema.OpeningHoursInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).openingHours.updateMany(input))),
        update: procedure.input($Schema.OpeningHoursInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).openingHours.update(input))),
        upsert: procedure.input($Schema.OpeningHoursInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).openingHours.upsert(input))),
        count: procedure.input($Schema.OpeningHoursInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).openingHours.count(input))),
    });
}
//# sourceMappingURL=OpeningHours.router.js.map