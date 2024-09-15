import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {ItemSliderComponent} from "../../shared/item-slider/item-slider.component";
import {DealsCardComponent} from "../../shared/deals-card/deals-card.component";
import {DealsCardsComponent} from "../../shared/blocks/deals-cards/deals-cards.component";
import {HomeService} from "./home.service";
import {RouterLink} from "@angular/router";
import {SearchDropdownComponent} from "../../shared/search-dropdown/search-dropdown.component";
import {Meta, Title} from "@angular/platform-browser";

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


    constructor(private homeService: HomeService, private titleService: Title, private metaService: Meta) {
    }

    ngOnInit() {

        // Set meta title
        this.titleService.setTitle('Game Deals - Best Discount and Offers on Top Games');  // <-- Set the title dynamically

        // Set meta description
        this.metaService.addTags([
            {
                name: 'description',
                content: `Find the best game deals on top titles with huge discounts! Explore daily offers and save big on the latest video games for all platforms. Don't miss out!`
            },
            { name: 'keywords', content: 'playze.io ,popular games, video game deals, new game releases, game discounts, best game deals, cheap video games, top-rated games, gaming offers, latest game discounts, game sales, PC games, console games, Xbox deals, PlayStation deals, Steam deals, game bundles' }
        ]);

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
