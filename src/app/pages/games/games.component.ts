import {Component, HostListener, OnInit} from '@angular/core';
import {FiltersComponent} from "../../shared/blocks/filters/filters.component";
import {HeaderComponent} from "../../header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {TagComponent} from "../../shared/tag/tag.component";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {PaginationComponent} from "../../shared/pagination/pagination.component";
import {GamesService} from "./games.service";
import {SearchDropdownComponent} from "../../shared/search-dropdown/search-dropdown.component";
import {GameDetailCardComponent} from "../../shared/game-detail-card/game-detail-card.component";

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
        GameDetailCardComponent,
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
    hoveredGameId: string | null = null;  // Holds the gameId when a game is hovered
    hoveredGameName: string | null = null;  // Holds the gameId when a game is hovered
    hoveredGameImage: string | null = null;  // Holds the gameId when a game is hovered
    private hoverTimeout: any; // Variable to hold the timeout

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
            this.onHover(this.games[0].gameId,this.games[0].name);
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

    // Triggered on mouse enter
    onMouseEnter(gameId: any, gameName:any, gameImage:any) {
        this.hoverTimeout = setTimeout(() => {
            this.onHover(gameId,gameName,gameImage); // Only call this after 0.5 sec
        }, 500); // 0.5 seconds delay
    }

    // Triggered on mouse leave, cancel the hover action if it hasn't triggered yet
    onMouseLeave() {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout); // Clear the timeout if mouse leaves before 0.5 sec
            this.hoverTimeout = null;
        }
    }

    onHover(gameId: string, gameName?: any, gameImage?: any) {
        this.hoveredGameId = gameId;  // Store the hovered gameId
        this.hoveredGameName = gameName;  // Store the hovered gameId
        this.hoveredGameImage = gameImage;  // Store the hovered gameId
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sidebar = document.querySelector('.games-card') as HTMLElement;

        sidebar.scrollTop = scrollTop;
    }
}
