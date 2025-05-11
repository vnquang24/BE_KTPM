"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.FieldInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.aggregate(input))),
        createMany: procedure.input($Schema.FieldInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).field.createMany(input))),
        create: procedure.input($Schema.FieldInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).field.create(input))),
        deleteMany: procedure.input($Schema.FieldInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).field.deleteMany(input))),
        delete: procedure.input($Schema.FieldInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).field.delete(input))),
        findFirst: procedure.input($Schema.FieldInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.FieldInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.FieldInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.findMany(input))),
        findUnique: procedure.input($Schema.FieldInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.FieldInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.FieldInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.groupBy(input))),
        updateMany: procedure.input($Schema.FieldInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).field.updateMany(input))),
        update: procedure.input($Schema.FieldInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).field.update(input))),
        upsert: procedure.input($Schema.FieldInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).field.upsert(input))),
        count: procedure.input($Schema.FieldInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).field.count(input))),
    });
}
//# sourceMappingURL=Field.router.js.map