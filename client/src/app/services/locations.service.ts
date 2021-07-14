import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../interfaces/location';


@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private api_path: string = '/api/locations/'
  private locations$: BehaviorSubject<Location[]> = new BehaviorSubject(undefined)

  constructor(private http: HttpClient) { }

  subscribeAll(): Observable<Location[]>{
    return this.locations$
  }

  refreshAll(): Promise<any> {
    return this.http.post<Location[]>(
      this.api_path + 'all',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result)=>{
      this.locations$.next(result)
    })
  }

  getSingle(id: number): Observable<Location>{
    const params = {
      id
    }
    return this.http.post<Location>(
      this.api_path + 'single',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  insert(params: Location): Observable<boolean>{
    return this.http.post<boolean>(
      this.api_path + 'insert',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  update(xParams: [number, Location]): Observable<boolean>{
    const params = {
      id: xParams[0],
      ...xParams[1]
    }

    return this.http.post<boolean>(
      this.api_path + 'update',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  delete(id: number): Observable<boolean>{
    const params = {
      id,
    }
    return this.http.post<boolean>(
      this.api_path +  'delete',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }
}
