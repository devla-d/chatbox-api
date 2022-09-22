import { Entity } from "typeorm";
import BaseModel from ".";

@Entity("authtoken")
class Authtoken extends BaseModel {}

export default Authtoken;
