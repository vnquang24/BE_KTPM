"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.ReviewInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.aggregate(input))),
        createMany: procedure.input($Schema.ReviewInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).review.createMany(input))),
        create: procedure.input($Schema.ReviewInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).review.create(input))),
        deleteMany: procedure.input($Schema.ReviewInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).review.deleteMany(input))),
        delete: procedure.input($Schema.ReviewInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).review.delete(input))),
        findFirst: procedure.input($Schema.ReviewInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.ReviewInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.ReviewInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.findMany(input))),
        findUnique: procedure.input($Schema.ReviewInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.ReviewInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.ReviewInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.groupBy(input))),
        updateMany: procedure.input($Schema.ReviewInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).review.updateMany(input))),
        update: procedure.input($Schema.ReviewInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).review.update(input))),
        upsert: procedure.input($Schema.ReviewInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).review.upsert(input))),
        count: procedure.input($Schema.ReviewInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).review.count(input))),
    });
}
//# sourceMappingURL=Review.router.js.map