import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CompanyEntity } from '../../companies/entities/company.entity'
import { InviteStatus } from '../enums/invite-status.enum'

@Entity('company_invites')
export class CompanyInviteEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'company_id' })
	company: CompanyEntity

	@Column({
		type: 'enum',
		enum: InviteStatus,
		default: InviteStatus.PENDING
	})
	status: InviteStatus

	@CreateDateColumn()
	createdAt: Date
}
