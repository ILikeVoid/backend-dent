import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CompanyInviteEntity } from './entities/company-invite.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { InviteStatus } from './enums/invite-status.enum'
import { CompanyEntity } from '../companies/entities/company.entity'
import { CreateInviteDto } from './dto/create-invite.dto'
import { CompaniesService } from '../companies/companies.service'

@Injectable()
export class CompanyInvitesService {
	constructor(
		@InjectRepository(CompanyInviteEntity)
		private readonly inviteRepo: Repository<CompanyInviteEntity>,
		private readonly usersService: UsersService,
		private readonly companyService: CompaniesService
	) {}

	async invite(companyId: number, dto: CreateInviteDto) {
		const company = await this.companyService.finById(companyId)
		if (!company) throw new BadRequestException('Компания не найдена')

		const existing = await this.inviteRepo.findOne({
			where: {
				email: dto.email,
				company: { id: companyId },
				status: InviteStatus.PENDING
			}
		})

		if (existing) {
			throw new BadRequestException('Инвайт уже отправлен')
		}

		return this.inviteRepo.save({
			email: dto.email,
			company: { id: companyId }
		})
	}

	async accept(inviteId: number, userId: number) {
		const invite = await this.inviteRepo.findOne({
			where: { id: inviteId },
			relations: ['company']
		})

		if (!invite || invite.status !== InviteStatus.PENDING) {
			throw new BadRequestException('Инвайт недоступен')
		}

		const user = await this.usersService.findById(userId)

		user.company = invite.company
		await this.usersService.save(user)

		invite.status = InviteStatus.ACCEPTED
		await this.inviteRepo.save(invite)

		return { success: true }
	}

	async reject(inviteId: number, userId: number) {
		const invite = await this.inviteRepo.findOne({
			where: { id: inviteId }
		})

		if (!invite || invite.status !== InviteStatus.PENDING) {
			throw new BadRequestException('Инвайт недоступен')
		}

		invite.status = InviteStatus.REJECTED
		await this.inviteRepo.save(invite)

		return { success: true }
	}
}
