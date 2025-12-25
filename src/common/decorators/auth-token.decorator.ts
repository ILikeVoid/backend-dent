import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const AuthToken = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest<Request>()
	const auth = request.headers.authorization

	if (!auth) return null
	return auth.split(' ')[1]
})
