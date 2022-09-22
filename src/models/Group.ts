import { Entity, Column } from "typeorm";
import BaseModel from ".";

@Entity("group")
class Group extends BaseModel {}

export default Group;
