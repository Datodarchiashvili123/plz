import { Injectable } from '@angular/core';
import {catchError, map, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) {

  }

  getGames() {
    return this.http.get(`https://playzeapi20240331223804.azurewebsites.net/game/games`)
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
