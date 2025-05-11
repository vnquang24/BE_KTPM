import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findOne(userId: string): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
}
