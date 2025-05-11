import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { User } from '../decorator';
import { UserDto } from './dto/user.dto';
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
    constructor(@Inject(UsersService) private readonly userService: UsersService) {}

    @Get('me')
    async findOne(@User() userId : string): Promise<UserDto> {
        return this.userService.findOne(userId);
    }
    
    @Get('all')
    async findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }
}
