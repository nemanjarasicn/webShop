import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs'
import { User } from '../interfaces/user.interface'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivateChild { 
  constructor(private http:HttpClient, private router:Router) {}
  
  private user$: BehaviorSubject<User> = new BehaviorSubject(null)
  private user: User
  private isMenuOpend$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  setUser(value: User): void{
    this.user = value
    this.user$.next(value)
  }

  subscribeUser(): Observable<User | null>{
    return this.user$
  }

  getUser(): User{
    return this.user
  }

  login(params: {
    username: string,
    password: string,
    save_me: boolean
  }): Observable<boolean | User>{
      return this.http.post<boolean | User>(
        '/api/user/login',
        params,
        {headers: {'content-type': 'application/json'}}      
      )
  }

  isAlreadyLogged(): Observable<[boolean, User | null]>{
    return this.http.post<[boolean, User | null]>(
      '/api/user/isAlreadyLogged',
      {headers: {'content-type': 'application/json'}}      
    )
  }

  getIsMenuOpened(): Observable<boolean>{
    return this.isMenuOpend$
  }

  setIsMenuOpened(val: boolean): void{
    this.isMenuOpend$.next(val)
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
      const tmp: User = this.getUser()
      if (tmp === undefined || tmp.rule_id !== 1) return false;
      return true;
  }
}
