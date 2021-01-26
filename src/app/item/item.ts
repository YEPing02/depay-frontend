import { Link } from "../shared/link";

export class Item{
     id!: string;
     name!: string;
     description!: string;
     price!: number;
     uploadTime!: Date;
     userId!: string;
     pseudo!: string;
     isDeleted!: boolean;
     links!: Link[];
}
const item: Item = new Item();