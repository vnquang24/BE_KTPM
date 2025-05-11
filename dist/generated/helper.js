"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMutate = checkMutate;
exports.checkRead = checkRead;
const server_1 = require("@trpc/server");
const runtime_1 = require("@zenstackhq/runtime");
async function checkMutate(promise) {
    try {
        return await promise;
    }
    catch (err) {
        if ((0, runtime_1.isPrismaClientKnownRequestError)(err)) {
            if (err.code === 'P2004') {
                if (err.meta?.reason === 'RESULT_NOT_READABLE') {
                    return undefined;
                }
                else {
                    throw new server_1.TRPCError({
                        code: 'FORBIDDEN',
                        message: err.message,
                        cause: err,
                    });
                }
            }
            else {
                throw new server_1.TRPCError({
                    code: 'BAD_REQUEST',
                    message: err.message,
                    cause: err,
                });
            }
        }
        else {
            throw err;
        }
    }
}
async function checkRead(promise) {
    try {
        return await promise;
    }
    catch (err) {
        if ((0, runtime_1.isPrismaClientKnownRequestError)(err)) {
            if (err.code === 'P2004') {
                throw new server_1.TRPCError({
                    code: 'FORBIDDEN',
                    message: err.message,
                    cause: err,
                });
            }
            else if (err.code === 'P2025') {
                throw new server_1.TRPCError({
                    code: 'NOT_FOUND',
                    message: err.message,
                    cause: err,
                });
            }
            else {
                throw new server_1.TRPCError({
                    code: 'BAD_REQUEST',
                    message: err.message,
                    cause: err,
                });
            }
        }
        else {
            throw err;
        }
    }
}
//# sourceMappingURL=helper.js.map