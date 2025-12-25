import { Controller } from '@nestjs/common'
import { CompaniesService } from './companies.service'

@Controller('companies')
export class CompanyController {
	constructor(private readonly companyService: CompaniesService) {}
}
