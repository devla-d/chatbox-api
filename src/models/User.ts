import { Entity, Column } from "typeorm";
import BaseModel from ".";

@Entity("users")
class User extends BaseModel {
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

  @Column({ type: String, nullable: true })
  image?: string;

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
