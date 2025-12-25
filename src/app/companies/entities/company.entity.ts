import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

	@Column({ nullable: true })
	phone: string
}
