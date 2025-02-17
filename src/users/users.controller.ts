import { ValidationPipe, ParseIntPipe, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // GET /users or /users?role=value&age=value
    @Get()
    findAll(@Query("role") role? : "INTERN" | "ENGINEER" | "ADMIN") {
        return this.usersService.findAll(role);
    }

    // GET /users/:id
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    // POST /users
    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // PATCH /users/:id
    @Patch(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    // DELETE /users/:id
    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}