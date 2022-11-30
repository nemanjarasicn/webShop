import { Component, OnInit } from '@angular/core';
import {IBlogHomeLatest} from '../../../../../interfaces/blog';
import {BlogService} from '../../../../../services/blog.service';

@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.scss']
})
export class HomeBlogComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  blogs: IBlogHomeLatest[];

  ngOnInit(): void {
    this.blogService.getHomeLatest().then(res => {
      this.blogs = res;
    });
  }

}
