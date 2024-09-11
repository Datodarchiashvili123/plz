import { Injectable } from '@angular/core';
import {catchError, map, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) {

  }
  getGames(pageNumber?:number, pageSize?:number, filters?:any) {

      let apiUrl = `${environment.apiUrl}/game/games?`;

      if(pageSize){
          apiUrl += `&PageSize=${pageSize}`;
      }
      if(pageNumber){
          apiUrl += `&PageNumber=${pageNumber}`;
      }
      if (filters) {
          Object.keys(filters).forEach(key => {
              const filterValue = filters[key];
              if (Array.isArray(filterValue)) { // Check if the filter value is an array (multi-select case).
                  filterValue.forEach((value: any) => {
                      if (value) { // Only append if there's a value.
                          apiUrl += `&${key}=${value}`; // Append each value for multi-select filters.
                      }
                  });
              } else if (filterValue) { // Handle single-select case.
                  apiUrl += `&${key}=${filterValue}`; // Append single value.
              }
          });
      }

    return this.http.get(apiUrl)
      .pipe(
        map((res: any) => {
            console.log(res);
          return res;
        }),
        catchError((error: Error) => {
          return throwError(() => error);
        })
      );
  }
}
