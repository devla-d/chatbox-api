import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 12,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ default: "user" })
  roles: "user" | "admin" | "super_admin";

  @Column({ nullable: true })
  image: string | null;

  @Column({ type: Boolean, default: false })
  online: boolean;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: Boolean, default: true })
  is_active: boolean;

  @Column()
  password: string;
}

export default User;
