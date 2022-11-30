import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBlogList, IBlogListRecent} from '../../../interfaces/blog';
import {BlogService} from '../../../services/blog.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {
  blogs!: IBlogList[];
  recentBlogs!: IBlogListRecent[];

  subscription: Subscription;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.subscription = this.blogService.subscribeRecentBlogs().subscribe(res => {
      this.recentBlogs = res;
    });

    this.getBlogs({limit: 8});
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  getBlogs(param?: {offset?: number, limit: number}): void{
    this.blogService.getBlogsList(param).then(res => {
      this.blogs = res;
    });
  }

}
