import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		})
	)

	const config = app.get(ConfigService)
	const port = config.get<number>('PORT') ?? 4000

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))


	await app.listen(port)
}

bootstrap()
