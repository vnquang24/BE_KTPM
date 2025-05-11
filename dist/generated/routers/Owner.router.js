"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.OwnerInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.aggregate(input))),
        createMany: procedure.input($Schema.OwnerInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).owner.createMany(input))),
        create: procedure.input($Schema.OwnerInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).owner.create(input))),
        deleteMany: procedure.input($Schema.OwnerInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).owner.deleteMany(input))),
        delete: procedure.input($Schema.OwnerInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).owner.delete(input))),
        findFirst: procedure.input($Schema.OwnerInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.OwnerInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.OwnerInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.findMany(input))),
        findUnique: procedure.input($Schema.OwnerInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.OwnerInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.OwnerInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.groupBy(input))),
        updateMany: procedure.input($Schema.OwnerInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).owner.updateMany(input))),
        update: procedure.input($Schema.OwnerInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).owner.update(input))),
        upsert: procedure.input($Schema.OwnerInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).owner.upsert(input))),
        count: procedure.input($Schema.OwnerInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).owner.count(input))),
    });
}
//# sourceMappingURL=Owner.router.js.map