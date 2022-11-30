import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BlogService} from '../../../services/blog.service';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss']
})
export class BlogSingleComponent implements OnInit {
  imgSrc!: string;
  imgAlt!: string;
  title!: string;
  publishedDate!: Date;
  content!: string;
  blogId!: number;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogId = +this.route.snapshot.paramMap.get('blogid');

    this.blogService.setNewRecentBlog(this.blogId);

    this.blogService.getSingle(+this.blogId).then(res => {
      this.content = res.content;
      this.title = res.title;
      this.publishedDate = res.published_date;
      this.imgSrc = res.image.src_name;
      this.imgAlt = res.image.alt_text;
    });
  }

}
