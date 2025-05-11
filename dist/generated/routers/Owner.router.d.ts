import { type RouterFactory, type ProcBuilder, type BaseConfig } from ".";
export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>): CreateRouterInner<Config_1, ProcRouterRecord>;
