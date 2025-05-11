export declare class BaseDto {
    id: string;
    description?: string;
    deleted?: Date;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    phone: string;
    email: string;
    dateOfBirth: Date | null;
}
export interface UserDto {
    id: string;
    email: string;
    name: string;
    phone: string;
    dateOfBirth: Date | null;
}
export declare class GroupDto extends BaseDto {
    permissions?: PermissionDto[];
}
export declare class PermissionDto extends BaseDto {
    permissionType?: string;
}
