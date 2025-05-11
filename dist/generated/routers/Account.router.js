"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.AccountInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.aggregate(input))),
        createMany: procedure.input($Schema.AccountInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).account.createMany(input))),
        create: procedure.input($Schema.AccountInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).account.create(input))),
        deleteMany: procedure.input($Schema.AccountInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).account.deleteMany(input))),
        delete: procedure.input($Schema.AccountInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).account.delete(input))),
        findFirst: procedure.input($Schema.AccountInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.AccountInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.AccountInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.findMany(input))),
        findUnique: procedure.input($Schema.AccountInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.AccountInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.AccountInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.groupBy(input))),
        updateMany: procedure.input($Schema.AccountInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).account.updateMany(input))),
        update: procedure.input($Schema.AccountInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).account.update(input))),
        upsert: procedure.input($Schema.AccountInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).account.upsert(input))),
        count: procedure.input($Schema.AccountInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).account.count(input))),
    });
}
//# sourceMappingURL=Account.router.js.map