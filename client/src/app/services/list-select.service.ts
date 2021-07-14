import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSelectService {

  constructor(private http: HttpClient) { }

  get(path: string): Observable<{name: string, value: string}[]>{
    return this.http.post<{name: string, value: string}[]>(
      '/api/' + path,
      {headers: {'content-type': 'application/json'}}

    )
  }
}
