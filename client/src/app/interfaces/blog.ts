import {PickMedia} from './pick-media';

export interface BlogTbTr {
  id?: number;
  title: string;
  short_desc: string;
  content: string;
  published_date?: Date;
  image?: PickMedia;
}


export interface IBlogHomeLatest{
  id: number;
  title: string;
  published_date_day: string;
  published_date_month_txt: string;
  short_desc: string;
  content: string;
  main_img_src: string;
  main_img_alt_text: string;
}

export interface IBlogList{
  id: number;
  title: string;
  published_date_day: string;
  published_date_month_txt: string;
  published_date_year: string;
  short_desc: string;
  image: PickMedia;
}

export interface IBlogListRecent {
  id: number;
  title: string;
  published_date_day: string;
  published_date_month_txt: string;
  published_date_year: string;
  image: PickMedia;
}

