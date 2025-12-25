import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { RefreshStrategy } from './strategies/refresh.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get('JWT_ACCESS_SECRET'),
				signOptions: {
					expiresIn: config.get('JWT_ACCESS_EXPIRES')
				}
			})
		}),
		UsersModule
	],
	providers: [AuthService, JwtStrategy, RefreshStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
