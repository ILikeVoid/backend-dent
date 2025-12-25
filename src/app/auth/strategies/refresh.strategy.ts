import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(config: ConfigService) {
		const secret = config.get<string>('JWT_REFRESH_SECRET')
		if (!secret) {
			throw new Error('JWT_REFRESH_SECRET is not defined')
		}

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secret
		})
	}

	validate(payload: { sub: number }) {
		return payload
	}
}