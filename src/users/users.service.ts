import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice Smith",
            "email": "alice.smith@example.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Bob Johnson",
            "email": "bob.johnson@example.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Charlie Brown",
            "email": "charlie.brown@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 4,
            "name": "Diana Prince",
            "email": "diana.prince@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "Ethan Hunt",
            "email": "ethan.hunt@example.com",
            "role": "ADMIN"
        }
    ];

    findAll(role?: "INTERN" | "ENGINEER" | "ADMIN") {
        if (role) {
            const filteredUserArray = this.users.filter(x => x.role === role);
            if (filteredUserArray.length === 0) {
                throw new NotFoundException("User Role Not Found");
            }
            return filteredUserArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(x => x.id == id);
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighesId = [...this.users].sort((x, y) => y.id - x.id);
        const newUser = {
            id: usersByHighesId[0].id+1,
            ...createUserDto
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    ...updateUserDto
                };
            }
            return x;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(x => x.id !== id);
        return removedUser;
    }
}
