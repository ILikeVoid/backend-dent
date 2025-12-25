import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../../common/decorators/user.decorator'
import { AuthToken } from '../../common/decorators/auth-token.decorator'
import { RefreshGuard } from './guards/refresh.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto)
	}

	@Post('login')
	async login(@Body() credentials: LoginDto) {
		return await this.authService.login(credentials)
	}

	@UseGuards(RefreshGuard)
	@Post('refresh')
	refresh(@User('sub') userId: number, @AuthToken() refreshToken: string) {
		return this.authService.refresh(userId, refreshToken)
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout(@User('id') userId: number) {
		await this.authService.logout(userId)
		return { success: true }
	}
}
