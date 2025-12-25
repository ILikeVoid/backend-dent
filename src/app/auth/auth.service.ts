import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'
import { UserEntity } from '../users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService
	) {}

	private async issueTokens(user: UserEntity) {
		const payload = { sub: user.id, email: user.email }

		const accessToken = this.jwtService.sign(payload, {
			secret: this.config.get('JWT_ACCESS_SECRET'),
			expiresIn: this.config.get('JWT_ACCESS_EXPIRES')
		})

		const refreshToken = this.jwtService.sign(payload, {
			secret: this.config.get('JWT_REFRESH_SECRET'),
			expiresIn: this.config.get('JWT_REFRESH_EXPIRES')
		})

		await this.usersService.updateRefreshToken(user.id, await bcrypt.hash(refreshToken, 10))

		return { accessToken, refreshToken }
	}

	async register(dto: CreateUserDto) {
		const existsUser = await this.usersService.findByEmail(dto.email)
		if (existsUser) {
			throw new BadRequestException('Пользователь уже существует')
		}

		const hash = await bcrypt.hash(dto.password, 10)
		const user = await this.usersService.create({
			...dto,
			password: hash
		})

		const safeUser = await this.usersService.findById(user.id)

		return {
			safeUser,
			tokens: await this.issueTokens(user)
		}
	}

	async login(dto: LoginDto) {
		const user = await this.usersService.findByEmail(dto.email)
		if (!user) throw new UnauthorizedException('Неверный логин или пароль')

		const valid = await bcrypt.compare(dto.password, user.password)
		if (!valid) throw new UnauthorizedException('Неверный логин или пароль')

		return this.issueTokens(user)
	}

	async refresh(userId: number, refreshToken: string) {
		const user = await this.usersService.findById(userId)
		if (!user || !user.refreshToken) {
			throw new UnauthorizedException()
		}

		const valid = await bcrypt.compare(refreshToken, user.refreshToken)
		if (!valid) throw new UnauthorizedException()

		return this.issueTokens(user)
	}
}
