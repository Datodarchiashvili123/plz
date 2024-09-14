import {Component, OnInit} from '@angular/core';
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
    currentFilters: any = {};
    orderBy: string = 'Popularity'// Store current filters here
    searchValue: string = '';


    constructor(private gamesService: GamesService) {
    }

    ngOnInit() {
        this.loadGames(this.currentPage, this.currentFilters, this.orderBy, this.searchValue); // Load games with current filters
    }

    // Fetch games for the current page
    loadGames(page: number, filters: any = {}, orderBy?: string, name?: string) {
        this.gamesService.getGames(page, 10, filters, orderBy, name).subscribe(data => {
            this.games = data.results;
            this.totalPages = data.totalPages;
            this.currentPage = data.currentPage;
        });
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        this.loadGames(this.currentPage, this.currentFilters, this.orderBy, this.searchValue); // Fetch the data for the new page
    }

    // In your games component
    handleFilterChange(filters: any) {
        this.currentFilters = filters;
        this.currentPage = 1;// Update the current filters
        this.loadGames(1, this.currentFilters, this.orderBy, this.searchValue);
    }

    onSortChange(event: any) {
        this.orderBy = event
        this.loadGames(this.currentPage, this.currentFilters, this.orderBy, this.searchValue);
    }

    handleSearchChange(search: string) {
        debugger
        this.searchValue = search;
        this.loadGames(1, this.currentFilters, this.orderBy, this.searchValue);
    }
}
