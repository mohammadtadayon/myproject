import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {

@PrimaryGeneratedColumn()
id: number;

@Column()
firstname:string;

@Column()
lastname:string;

@Column({ type: 'date' })
birthDate: Date;

@Column({ unique: true })
username:string;

@Column()
password:string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;
}
