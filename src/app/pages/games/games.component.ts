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
import {Meta, Title} from "@angular/platform-browser";

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
    orderBy: string = 'Popularity';
    searchValue: string = '';
    hoveredGameId: string | null = null;
    hoveredGameName: string | null = null;
    hoveredGameImage: string | null = null;
    private hoverTimeout: any;

    constructor(
        private gamesService: GamesService,
        private titleService: Title,
        private metaService: Meta
    ) {}

    ngOnInit() {
        this.loadGames(this.currentPage, this.currentFilters, this.orderBy, this.searchValue);

        // Set static meta title
        this.titleService.setTitle('Popular Games - Discover Top-Rated Titles and Must-Play Releases');
    }

    loadGames(page: number, filters: any = {}, orderBy?: string, name?: string) {
        this.gamesService.cancelRequest();
        this.gamesService.getGames(page, 10, filters, orderBy, name).subscribe((data: any) => {
            this.games = data.results;
            console.log(this.games);
            this.totalPages = data.totalPages;
            this.currentPage = data.currentPage;
            this.onHover(this.games[0]?.gameId, this.games[0]?.gameName, this.games[0]?.headerImageUrl);
            // Dynamically update meta tags based on the loaded games
            this.updateMetaTags(this.games);
        });
    }

    updateMetaTags(games: any[]) {
        const gameNames = games.map(game => game.name).join(', ');
        const baseKeywords = 'popular games, top-rated video games, new game releases, best game deals, game discounts, cheap video games, trending video games, must-play games, video game offers, gaming discounts, PC games on sale, console games deals, Xbox game deals, PlayStation game deals, Steam game sales, playze.io';
        const dynamicKeywords = `${baseKeywords}, ${gameNames}`;

        this.metaService.updateTag({ name: 'keywords', content: dynamicKeywords });
        this.metaService.updateTag({
            name: 'description',
            content: 'Explore the most popular games across all platforms! Check out top-rated titles, trending releases, and fan-favorite games. Get deals and start playing now!'
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
        this.searchValue = search;
        this.loadGames(1, this.currentFilters, this.orderBy, this.searchValue);
    }

    // Triggered on mouse enter
    onMouseEnter(gameId: any, gameName: any, gameImage: any) {
        this.hoverTimeout = setTimeout(() => {
            this.onHover(gameId, gameName, gameImage); // Only call this after 0.5 sec
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
