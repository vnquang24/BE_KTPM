"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const _1 = require(".");
const _Schema = require("@zenstackhq/runtime/zod/input");
const $Schema = _Schema.default ?? _Schema;
const helper_1 = require("../helper");
function createRouter(router, procedure) {
    return router({
        aggregate: procedure.input($Schema.MaintenanceScheduleInputSchema.aggregate).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.aggregate(input))),
        createMany: procedure.input($Schema.MaintenanceScheduleInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).maintenanceSchedule.createMany(input))),
        create: procedure.input($Schema.MaintenanceScheduleInputSchema.create).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).maintenanceSchedule.create(input))),
        deleteMany: procedure.input($Schema.MaintenanceScheduleInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).maintenanceSchedule.deleteMany(input))),
        delete: procedure.input($Schema.MaintenanceScheduleInputSchema.delete).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).maintenanceSchedule.delete(input))),
        findFirst: procedure.input($Schema.MaintenanceScheduleInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.findFirst(input))),
        findFirstOrThrow: procedure.input($Schema.MaintenanceScheduleInputSchema.findFirst.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.findFirstOrThrow(input))),
        findMany: procedure.input($Schema.MaintenanceScheduleInputSchema.findMany.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.findMany(input))),
        findUnique: procedure.input($Schema.MaintenanceScheduleInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.findUnique(input))),
        findUniqueOrThrow: procedure.input($Schema.MaintenanceScheduleInputSchema.findUnique).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.findUniqueOrThrow(input))),
        groupBy: procedure.input($Schema.MaintenanceScheduleInputSchema.groupBy).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.groupBy(input))),
        updateMany: procedure.input($Schema.MaintenanceScheduleInputSchema.updateMany).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).maintenanceSchedule.updateMany(input))),
        update: procedure.input($Schema.MaintenanceScheduleInputSchema.update).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).maintenanceSchedule.update(input))),
        upsert: procedure.input($Schema.MaintenanceScheduleInputSchema.upsert).mutation(async ({ ctx, input }) => (0, helper_1.checkMutate)((0, _1.db)(ctx).maintenanceSchedule.upsert(input))),
        count: procedure.input($Schema.MaintenanceScheduleInputSchema.count.optional()).query(({ ctx, input }) => (0, helper_1.checkRead)((0, _1.db)(ctx).maintenanceSchedule.count(input))),
    });
}
//# sourceMappingURL=MaintenanceSchedule.router.js.map