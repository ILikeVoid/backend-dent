import { Module } from '@nestjs/common'
import { CompanyInvitesService } from './company-invites.service'
import { CompanyInvitesController } from './company-invites.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyInviteEntity } from './entities/company-invite.entity'

@Module({
	imports: [TypeOrmModule.forFeature([CompanyInviteEntity])],
	controllers: [CompanyInvitesController],
	providers: [CompanyInvitesService]
})
export class CompanyInvitesModule {}
