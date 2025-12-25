import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CompanyEntity } from './entities/company.entity'

@Injectable()
export class CompaniesService {
	constructor(
		@InjectRepository(CompanyEntity)
		private readonly companyRepo: Repository<CompanyEntity>
	) {}

	async finById(id: number) {
		return await this.companyRepo.findOne({ where: { id } })
	}
}
