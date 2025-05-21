import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsMobilePhone, IsDateString } from 'class-validator';
import { Role } from '@prisma/client';
export class RegisterDto {
    @ApiProperty({ example: 'admin@gmail.com' })
    @IsNotEmpty({ message: 'Username là bắt buộc' })
    username: string;

    @ApiProperty({ example: '1' })
    @IsString()
    @IsNotEmpty({message: 'Password là bắt buộc'})
    password: string;

    @ApiProperty({ example: '0987654321' })
    @IsOptional()
    @IsMobilePhone('vi-VN', {}, { message: 'Số điện thoại không hợp lệ' })
    phone: string;

    @ApiProperty({ example: 'admin@example.com' })
    @IsOptional()
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string;

    @ApiProperty({ example: '2000-01-01' })
    @IsOptional()
    @IsDateString({}, { message: 'Ngày sinh không hợp lệ' })
    dateOfBirth: string;

    @ApiProperty({ example: 'Owner' })
    @IsString()
    @IsNotEmpty({message: 'Role là bắt buộc'})
    role: Role;
}