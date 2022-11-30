import {PickMedia} from "../../client/src/app/interfaces/pick-media";

export interface IBlogHomeLatestInsertUpdate{
  id?: number
  title: string;
  short_desc: string;
  content: string;
  image?: PickMedia[];
}
