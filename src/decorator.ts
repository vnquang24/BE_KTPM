import {
	createParamDecorator,
	ExecutionContext,
	ForbiddenException,
	SetMetadata,
} from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	if (!request.user) {
		throw new ForbiddenException("token invalid");
	}

    return request.user.userId || request.user.id;
});
