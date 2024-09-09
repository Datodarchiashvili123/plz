import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    constructor(private http: HttpClient) {

    }

    getGenres() {
        return this.http.get(`${environment.apiUrl}/genre/genres`)
    }

    getDevelopers() {
        return this.http.get(`${environment.apiUrl}/developer/developers`)
    }

    getPublishers() {
        return this.http.get(`${environment.apiUrl}/publisher/publishers`)
    }

    getPlatforms() {
        return this.http.get(`${environment.apiUrl}/platform/platforms`)
    }

}
