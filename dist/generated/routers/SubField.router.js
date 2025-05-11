"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.SubFieldInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.aggregate(input))),
        createMany: procedure.input($Schema.SubFieldInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).subField.createMany(input))),
        create: procedure.input($Schema.SubFieldInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).subField.create(input))),
        deleteMany: procedure.input($Schema.SubFieldInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).subField.deleteMany(input))),
        delete: procedure.input($Schema.SubFieldInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).subField.delete(input))),
        findFirst: procedure.input($Schema.SubFieldInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.SubFieldInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.SubFieldInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.findMany(input))),
        findUnique: procedure.input($Schema.SubFieldInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.SubFieldInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.SubFieldInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.groupBy(input))),
        updateMany: procedure.input($Schema.SubFieldInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).subField.updateMany(input))),
        update: procedure.input($Schema.SubFieldInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).subField.update(input))),
        upsert: procedure.input($Schema.SubFieldInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).subField.upsert(input))),
        count: procedure.input($Schema.SubFieldInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).subField.count(input))),
    });
}
//# sourceMappingURL=SubField.router.js.map