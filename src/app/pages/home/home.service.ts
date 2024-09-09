import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError, map, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {


  }

  getDealCards(id: number) {
    return this.http.get(`${environment.apiUrl}/deal/dealcards?PresetTypeId=${id}`)
        .pipe(
            map((res: any) => {
              return res;
            }),
            catchError((error: Error) => {
              return throwError(() => error);
            })
        );
  }

    getTopGameCards() {
        return this.http.get(`${environment.apiUrl}/game/gamecards`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error: Error) => {
                    return throwError(() => error);
                })
            );
    }
}
