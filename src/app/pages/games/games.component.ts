import {Component} from '@angular/core';
import {FiltersComponent} from "../../shared/blocks/filters/filters.component";
import {HeaderComponent} from "../../header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {TagComponent} from "../../shared/tag/tag.component";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {PaginationComponent} from "../../shared/pagination/pagination.component";
import {GamesService} from "./games.service";
import {HttpClient, provideHttpClient} from "@angular/common/http";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    FiltersComponent,
    HeaderComponent,
    NgOptimizedImage,
    TagComponent,
    GameCardComponent,
    PaginationComponent,
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

  games: any;
  constructor(private getGames: GamesService) {
    this.getGames.getGames().subscribe(x => {

        this.games = x.results;

        console.log(this.games, ' games')

      }
    )
  }

}
