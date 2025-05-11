"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionDto = exports.GroupDto = exports.BaseDto = void 0;
class BaseDto {
    id;
    description;
    deleted;
    createdAt;
    updatedAt;
    username;
    phone;
    email;
    dateOfBirth;
}
exports.BaseDto = BaseDto;
class GroupDto extends BaseDto {
    permissions;
}
exports.GroupDto = GroupDto;
class PermissionDto extends BaseDto {
    permissionType;
}
exports.PermissionDto = PermissionDto;
//# sourceMappingURL=user.dto.js.map