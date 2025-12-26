import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common'
import { CompanyInvitesService } from './company-invites.service'
import { User } from '../../common/decorators/user.decorator'
import { CreateInviteDto } from './dto/create-invite.dto'

@Controller('company-invites')
export class CompanyInvitesController {
	constructor(private readonly invitesService: CompanyInvitesService) {}

	@Post()
	invite(@User('companyId') companyId: number, @Body() dto: CreateInviteDto) {
		return this.invitesService.invite(companyId, dto)
	}

	@Post(':id/accept')
	accept(@Param('id', ParseIntPipe) inviteId: number, @User('id') userId: number) {
		return this.invitesService.accept(inviteId, userId)
	}

	@Post(':id/reject')
	reject(@Param('id', ParseIntPipe) inviteId: number) {
		return this.invitesService.reject(inviteId)
	}
}
