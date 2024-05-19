import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {ItemSliderComponent} from "../../shared/item-slider/item-slider.component";
import {DealsCardComponent} from "../../shared/deals-card/deals-card.component";
import {DealsCardsComponent} from "../../shared/blocks/deals-cards/deals-cards.component";
import {GamesService} from "../games/games.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SlickCarouselModule,
    ItemSliderComponent,
    DealsCardComponent,
    DealsCardsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  @Input() src: string | undefined;
  @Input() name: string | undefined;
  @Input() discount: string | undefined;
  @Input() price: string | undefined;
  gamesData: any;
  sliderData: any;


  dealsCards = [
    {
      src: 'assets/elder3.png',
      name: 'Elder 3',
      discount: '20%',
      price: '10.00$'
    },
    {
      src: 'assets/elder-2.png',
      name: 'Elder 3',
      discount: '20%',
      price: '10.00$'
    },
    {
      src: 'assets/elder-card.png',
      name: 'Elder 3',
      discount: '20%',
      price: '10.00$'
    },
    {
      src: 'assets/elder-2.png',
      name: 'Elder 3',
      discount: '20%',
      price: '10.00$'
    },
    {
      src: 'assets/elder3.png',
      name: 'Elder 3',
      discount: '20%',
      price: '10.00$'
    },
  ]


  constructor(private games: GamesService) {
    this.games.getGames().subscribe((x: any) => {
      this.gamesData = x.results;

      this.sliderData = x.results.map((x: any) => {
        return {
          title: x.name,
          img: x.headerImageUrl,
          price: x.lowestPriceText
        }
      })
      console.log(this.sliderData, ' data ')
    })
  }

}
