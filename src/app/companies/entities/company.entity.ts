import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsOptional } from 'class-validator'

@Entity('company')
export class CompanyEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	bin: string

	@IsOptional()
	@Column({ nullable: true })
	phone?: string
}
