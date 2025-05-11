import { Controller, Body, Post, Get, HttpCode, HttpStatus, Headers, Request, UnauthorizedException, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '../decorator';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login') 
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Đăng nhập' })
    @ApiResponse({
        status: 200,
        description: 'Đăng nhập thành công',
        schema: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Sai thông tin đăng nhập' })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Đăng ký tài khoản' })
    @ApiResponse({
        status: 201,
        description: 'Đăng ký thành công',
        schema: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' }
            }
        }
    })

    @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ hoặc username đã tồn tại' })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
}