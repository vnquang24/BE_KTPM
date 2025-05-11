import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'john_doe' })
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    password: string;
}