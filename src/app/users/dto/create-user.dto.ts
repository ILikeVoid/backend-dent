import { IsEmail, IsString, MinLength } from 'class-validator'
import { UserSex } from '../enums/user-sex.enum'

export class CreateUserDto {
	@IsString()
	name: string

	@IsString()
	surname: string

	@IsEmail()
	email: string

	@MinLength(6)
	password: string

	@IsString()
	phone: string

	@IsString()
	sex: UserSex
}
