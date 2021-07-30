import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs'
import { User } from '../interfaces/user.interface'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot,RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivateChild { 
  constructor(private http:HttpClient, private router:Router) {}
  
  private user$: BehaviorSubject<User> = new BehaviorSubject(null)
  private logged$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private canActivateChild$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private isMenuOpend$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  setUser(value: User): void{
    if (value === undefined || value === null || value?.rule_id !== 1) this.canActivateChild$.next(false)
    else this.canActivateChild$.next(true)

    this.user$.next(value)
  }

  setLogged(val: boolean): void{
    this.logged$.next(val)
  }

  subscribeUser(): Observable<User | null>{
    return this.user$
  }
  
  subscribeLogged(): Observable<boolean>{
    return this.logged$
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

  logout(): Promise<boolean>{
    return this.http.post<boolean>(
      '/api/user/logout',
      {headers: {'content-type': 'application/json'}}      
    ).toPromise()
  }

  isAlreadyLogged(): Promise<void>{
    return this.http.post<[boolean, User | null]>(
      '/api/user/isAlreadyLogged',
      {headers: {'content-type': 'application/json'}}      
    ).toPromise().then(res=>{
      this.setUser(res[1])
      this.setLogged(res[0])
    })
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
  ): Promise<boolean>{
    return new Promise((res, rej)=>{
      this.canActivateChild$.subscribe((isItTrue)=>{
        res(isItTrue)
      })
    })     
  }
}
