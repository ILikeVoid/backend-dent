import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompanyController } from './companies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyEntity } from './entities/company.entity'

@Module({
	imports: [TypeOrmModule.forFeature([CompanyEntity])],
	controllers: [CompanyController],
	providers: [CompaniesService]
})
export class CompanyModule {}
