import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Media, MediaPick, MediaTrTd } from '../interfaces/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private endpoint = '/api/medias/';
  private medias$: BehaviorSubject<MediaTrTd[]> = new BehaviorSubject(undefined);
  private showFullMediaActive$: BehaviorSubject<string[]> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  subscribeAll(): Observable<MediaTrTd[]>{
    return this.medias$;
  }

  refreshAll(): Promise<any> {
    return this.http.post<MediaTrTd[]>(
      this.endpoint + 'all',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result) => {
      this.medias$.next(result);
    });
  }

  insert(params: Media): Observable<boolean>{
    const formData = new FormData();

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const element = params[key];
        formData.append(key, element);
      }
    }

    return this.http.post<boolean>(
      this.endpoint + 'insert',
      formData
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

  getTypes(): Observable<{id: number, label: string}[]>{
    return this.http.post<{id: number, label: string}[]>(
      this.endpoint + 'getTypes',
      {},
      {headers: {'content-type': 'application/json'}}
    );
  }

  getPickAll(): Promise<MediaPick[]>{
    return this.http.post<MediaPick[]>(this.endpoint +  'pickAll', {headers: {'content-type': 'application/json'}}).toPromise();
  }

  showFullMediaActiveArr(): Observable<string[]>{
    return this.showFullMediaActive$;
  }

  setShowFullMediaActiveArr(srcArr: string[]): void{
    this.showFullMediaActive$.next(srcArr);
  }
}
