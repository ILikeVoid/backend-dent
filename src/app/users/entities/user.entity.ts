import { CompanyEntity } from '../../companies/entities/company.entity'
import { RoleEntity } from 'src/app/roles/entities/role.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { UserSex } from '../enums/user-sex.enum'

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	surname: string

	@Index()
	@Column({ unique: true })
	email: string

	@Exclude()
	@Column()
	password: string

	@Column({ type: 'varchar', nullable: true })
	phone: string | null

	@Column({
		type: 'enum',
		enum: UserSex
	})
	sex: UserSex

	@Exclude()
	@Column({ type: 'text', nullable: true })
	refreshToken?: string | null

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'company_id' })
	company: CompanyEntity | null

	@ManyToOne(() => RoleEntity, { nullable: true })
	@JoinColumn({ name: 'role_id' })
	role: RoleEntity | null
}
