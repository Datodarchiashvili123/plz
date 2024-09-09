import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {
  constructor(
      private http: HttpClient,
      private sanitizer: DomSanitizer
      ) { }

  getGameDetails(id: string) {
   return  this.http.get(`${environment.apiUrl}/game/detailpage?Id=${id}`)
  }
}
