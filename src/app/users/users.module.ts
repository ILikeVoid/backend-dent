import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { CompanyEntity } from '../companies/entities/company.entity'
import { RoleEntity } from '../roles/entities/role.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity, RoleEntity])],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
