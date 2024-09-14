import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { catchError, map, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GamesService {

    constructor(private http: HttpClient, private transferState: TransferState) {}

    // Helper function to generate a unique key based on request parameters
    private getGamesKey(pageNumber?: number, pageSize?: number, filters?: any, orderBy = 'Popularity', name?: string) {
        const filterString = filters ? JSON.stringify(filters) : '';
        return makeStateKey(`games_${pageNumber || 1}_${pageSize || 10}_${filterString}_${orderBy}_${name || ''}`);
    }

    // Get games method with TransferState caching
    getGames(pageNumber?: number, pageSize?: number, filters?: any, orderBy = 'Popularity', name?:string,) {
        const gamesKey = this.getGamesKey(pageNumber, pageSize, filters, orderBy, name);
        const cachedData = this.transferState.get(gamesKey, null);

        if (cachedData) {
            // If data exists in TransferState, return it and remove from TransferState
            this.transferState.remove(gamesKey);
            return of(cachedData);
        } else {
            // Build the API URL
            let apiUrl = `${environment.apiUrl}/game/games?`;


            if (name) {
                apiUrl += `Name=${name}`;
            }

            if (pageSize) {
                apiUrl += `&PageSize=${pageSize}`;
            }
            if (pageNumber) {
                apiUrl += `&PageNumber=${pageNumber}`;
            }
            if (filters) {
                Object.keys(filters).forEach(key => {
                    const filterValue = filters[key];
                    if (Array.isArray(filterValue)) {
                        // Multi-select filter case
                        filterValue.forEach((value: any) => {
                            if (value) {
                                apiUrl += `&${key}=${value}`;
                            }
                        });
                    } else if (filterValue) {
                        // Single-select filter case
                        apiUrl += `&${key}=${filterValue}`;
                    }
                });
            }
            if (orderBy) {
                apiUrl += `&OrderBy=${orderBy}`;
            }

            // Make the HTTP request and cache the result in TransferState
            return this.http.get(apiUrl)
                .pipe(
                    map((res: any) => {
                        // Cache the result
                        this.transferState.set(gamesKey, res);
                        return res;
                    }),
                    catchError((error: Error) => throwError(() => error))
                );
        }
    }
}
