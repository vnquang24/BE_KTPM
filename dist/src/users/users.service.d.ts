import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(userId: string): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
}
