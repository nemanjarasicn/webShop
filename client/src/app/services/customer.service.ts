import { Injectable } from '@angular/core';
import {User} from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  endpoint = '/api/customer/' as string;

  register(): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'register',
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }
}
