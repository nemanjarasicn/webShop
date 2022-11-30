import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BlogTbTr, IBlogHomeLatest, IBlogList, IBlogListRecent} from '../interfaces/blog';
import {localStorageNames} from '../constants/localStorageNames';
import {StorageService} from './storage.service';
import {UiConstants} from '../constants/uiConstants';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private endpoint = '/api/blogs/';
  private blogs$: BehaviorSubject<BlogTbTr[]> = new BehaviorSubject(undefined);
  recentBlogs$ = new BehaviorSubject<IBlogListRecent[]>([]);

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.refreshRecentBlogs(this.storageService.getStorage(localStorageNames.recentBlogs));
  }

  subscribeAll(): Observable<BlogTbTr[]>{
    return this.blogs$;
  }

  refreshAll(): Promise<any> {
    return this.http.post<BlogTbTr[]>(
      this.endpoint + 'all',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result) => {
      this.blogs$.next(result);
    });
  }

  getSingle(id: number): Promise<BlogTbTr>{
    const params = {
      id
    };
    return this.http.post<BlogTbTr>(
      this.endpoint + 'single',
      params,
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  insert(params: BlogTbTr): Observable<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'insert',
      params,
      {headers: {'content-type': 'application/json'}}
    );
  }

  update(xParams: [number, BlogTbTr]): Observable<boolean>{
    const params = {
      id: xParams[0],
      ...xParams[1]
    };

    return this.http.post<boolean>(
      this.endpoint + 'update',
      params,
      {headers: {'content-type': 'application/json'}}
    );
  }

  delete(id: number): Observable<boolean>{
    const params = {
      id,
    };
    return this.http.post<boolean>(
      this.endpoint +  'delete',
      params,
      {headers: {'content-type': 'application/json'}}
    );
  }

  deleteMainImage(blogId: number, mediaId: number): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'deleteMainImage',
      {
        id: blogId,
        media_id: mediaId
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  getHomeLatest(): Promise<IBlogHomeLatest[]>{
    return this.http.post<IBlogHomeLatest[]>(
      this.endpoint + 'homeLatest',
      {},
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  getBlogsList(param: {offset?: number, limit: number}): Promise<IBlogList[]>{
    return this.http.post<IBlogList[]>(
      this.endpoint + 'blogsList',
      {
        ...param
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  subscribeRecentBlogs(): Observable<IBlogListRecent[]>{
    return this.recentBlogs$;
  }

  setNewRecentBlog(blogId: number): void{
    const recentBlogsIds = this.storageService.getStorage(localStorageNames.recentBlogs) as number[];

    if (
      recentBlogsIds.length > UiConstants.maxRecentBlogs &&
      !recentBlogsIds.find(id => id === blogId)
    ){
      recentBlogsIds.shift();
      recentBlogsIds.push(blogId);
    }

    this.storageService.setStorage(localStorageNames.recentBlogs, recentBlogsIds);
    this.refreshRecentBlogs(recentBlogsIds);
  }

  refreshRecentBlogs(ids: number[]): void{
    this.http.post<IBlogListRecent[]>(
      this.endpoint + 'recentBlogs',
      {ids},
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then(res => {
      this.recentBlogs$.next(res);
    });
  }
}
