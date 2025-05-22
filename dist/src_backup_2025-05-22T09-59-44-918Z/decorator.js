"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = "isPublic";
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.User = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        throw new common_1.ForbiddenException("token invalid");
    }
    return request.user.userId || request.user.id;
});
//# sourceMappingURL=decorator.js.map