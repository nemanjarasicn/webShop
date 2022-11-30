import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivateChild {
  constructor(private http: HttpClient) {}

  private user$: BehaviorSubject<IUser> = new BehaviorSubject(null);
  private logged$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private canActivateChild$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isMenuOpened$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private endpoint = '/api/user/' as string;

  setUser(value: IUser): void{
    if (value === undefined || value === null || value?.rule_id !== 1) { this.canActivateChild$.next(false); }
    else { this.canActivateChild$.next(true); }

    this.user$.next(value);
  }

  setLogged(val: boolean): void{
    this.logged$.next(val);
  }

  subscribeUser(): Observable<IUser | null>{
    return this.user$;
  }

  subscribeLogged(): Observable<boolean>{
    return this.logged$;
  }

  login(params: {
    username: string,
    password: string,
    save_me: boolean
  }): Observable<boolean | IUser>{
      return this.http.post<boolean | IUser>(
        this.endpoint + 'login',
        params,
        {headers: {'content-type': 'application/json'}}
      );
  }

  logout(): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'logout',
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  isAlreadyLogged(): Promise<void>{
    return this.http.post<IUser | false>(
      this.endpoint + 'isAlreadyLogged',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then(res => {
      if (res){
        this.setUser(res);
        this.setLogged(true);
      }else{
        this.setUser(null);
        this.setLogged(false);
      }


    });
  }

  getIsMenuOpened(): Observable<boolean>{
    return this.isMenuOpened$;
  }

  setIsMenuOpened(val: boolean): void{
    this.isMenuOpened$.next(val);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{ return this.canActivateChild$; }
}
