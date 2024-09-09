import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FiltersComponent} from "../../shared/blocks/filters/filters.component";
import {HeaderComponent} from "../../header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {TagComponent} from "../../shared/tag/tag.component";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {PaginationComponent} from "../../shared/pagination/pagination.component";
import {GamesService} from "./games.service";
import {SearchDropdownComponent} from "../../shared/search-dropdown/search-dropdown.component";

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
        SearchDropdownComponent,
    ],
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
    totalPages = 0;
    currentPage = 1;
    games: any;
    currentFilters: any = {}; // Store current filters here

    constructor(private gamesService: GamesService) {
    }

    ngOnInit() {
        this.loadGames(this.currentPage, this.currentFilters); // Load games with current filters
    }

    // Fetch games for the current page
    loadGames(page: number, filters: any = {} ) {
        this.gamesService.getGames(page, 10, filters).subscribe(data => {
            debugger
            this.games = data.results;
            this.totalPages = data.totalPages;
            this.currentPage = data.currentPage;
            console.log(this.games, ' games');

        });
    }


    onPageChange(newPage: number) {
        this.currentPage = newPage;
        this.loadGames(this.currentPage, this.currentFilters); // Fetch the data for the new page
    }

    // In your games component
    handleFilterChange(filters: any) {
        this.currentFilters = filters;
        this.currentPage = 1;// Update the current filters
        this.loadGames(1, this.currentFilters);
    }
}
