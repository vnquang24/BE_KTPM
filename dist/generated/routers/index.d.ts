import type { unsetMarker, AnyRootConfig, CreateRouterInner, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
export type BaseConfig = AnyRootConfig;
export type RouterFactory<Config extends BaseConfig> = <ProcRouterRecord extends ProcedureRouterRecord>(procedures: ProcRouterRecord) => CreateRouterInner<Config, ProcRouterRecord>;
export type UnsetMarker = typeof unsetMarker;
export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>>;
export declare function db(ctx: any): PrismaClient;
export declare function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>): CreateRouterInner<Config_1, ProcRouterRecord>;
