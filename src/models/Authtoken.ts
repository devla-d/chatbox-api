import { Entity, Column } from "typeorm";
import BaseModel from ".";

@Entity("authtoken")
class Authtoken extends BaseModel {
  @Column()
  refreshToken: string;
}

export default Authtoken;
