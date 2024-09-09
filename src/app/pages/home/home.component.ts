import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {ItemSliderComponent} from "../../shared/item-slider/item-slider.component";
import {DealsCardComponent} from "../../shared/deals-card/deals-card.component";
import {DealsCardsComponent} from "../../shared/blocks/deals-cards/deals-cards.component";
import {GamesService} from "../games/games.service";
import {HomeService} from "./home.service";
import {RouterLink} from "@angular/router";
import {SearchDropdownComponent} from "../../shared/search-dropdown/search-dropdown.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        NgOptimizedImage,
        SlickCarouselModule,
        ItemSliderComponent,
        DealsCardComponent,
        DealsCardsComponent,
        RouterLink,
        SearchDropdownComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    @Input() src: string | undefined;
    @Input() name: string | undefined;
    @Input() discount: string | undefined;
    @Input() price: string | undefined;
    gamesData: any;
    sliderData: any;
    // dealsCards: any = [];

    newDeals = [];
    bestDeals = [];


    constructor(private games: GamesService, private homeService: HomeService) { }

    ngOnInit() {
        this.homeService.getTopGameCards().subscribe((x: any) => {
            this.gamesData = x.popularGames;

            this.sliderData = x.popularGames.map((x: any) => {
                return {
                    title: x.name,
                    img: x.headerImageUrl,
                    price: x.lowestPriceText,
                    hasPrice: x.hasPrice,
                    gameId: x.gameId
                }
            })
        });


        this.homeService.getDealCards(1).subscribe((x: any) => {
            this.newDeals = x.dealCards
        })

        this.homeService.getDealCards(2).subscribe((x: any) => {
            this.bestDeals = x.dealCards
        })
    }

}
