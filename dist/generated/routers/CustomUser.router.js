"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.CustomUserInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.aggregate(input))),
        createMany: procedure.input($Schema.CustomUserInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).customUser.createMany(input))),
        create: procedure.input($Schema.CustomUserInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).customUser.create(input))),
        deleteMany: procedure.input($Schema.CustomUserInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).customUser.deleteMany(input))),
        delete: procedure.input($Schema.CustomUserInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).customUser.delete(input))),
        findFirst: procedure.input($Schema.CustomUserInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.CustomUserInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.CustomUserInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.findMany(input))),
        findUnique: procedure.input($Schema.CustomUserInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.CustomUserInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.CustomUserInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.groupBy(input))),
        updateMany: procedure.input($Schema.CustomUserInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).customUser.updateMany(input))),
        update: procedure.input($Schema.CustomUserInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).customUser.update(input))),
        upsert: procedure.input($Schema.CustomUserInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).customUser.upsert(input))),
        count: procedure.input($Schema.CustomUserInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).customUser.count(input))),
    });
}
//# sourceMappingURL=CustomUser.router.js.map