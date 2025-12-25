import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../types/jwt-payload.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(config: ConfigService) {
		const secret = config.get<string>('JWT_ACCESS_SECRET')
		if (!secret) {
			throw new Error('JWT_ACCESS_SECRET is not defined')
		}

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secret
		})
	}

	validate(payload: JwtPayload) {
		return {
			id: payload.sub,
			email: payload.email,
			companyId: payload.companyId
		}
	}
}
