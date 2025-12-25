import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>
	) {}

	async findByEmail(email: string) {
		return await this.userRepo.findOne({ where: { email } })
	}

	async findById(userId: number) {
		return await this.userRepo.findOne({ where: { id: userId } })
	}

	async create(dto: CreateUserDto) {
		return await this.userRepo.save(dto)
	}

	async updateRefreshToken(userId: number, refreshToken: string | null) {
		const result = await this.userRepo.update(userId, { refreshToken })

		if (result.affected === 0) {
			throw new NotFoundException(`Пользователь с id: ${userId} не найден`)
		}
	}
}