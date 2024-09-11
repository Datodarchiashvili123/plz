import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameDetailsService} from "./game-details.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {SearchDropdownComponent} from "../../shared/search-dropdown/search-dropdown.component";

@Component({
    selector: 'app-game-details',
    standalone: true,
    imports: [
        SlickCarouselModule,
        NgForOf,
        NgIf,
        NgOptimizedImage,
        SearchDropdownComponent,
    ],
    templateUrl: './game-details.component.html',
    styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent implements OnInit, OnDestroy {

    slides = [
        {img: "assets/img.png", index: 0},
        {img: "assets/img2.png", index: 1},
        {img: "assets/img.png", index: 2},
        {img: "assets/img2.png", index: 3},
        {img: "assets/img2.png", index: 4},

    ];

    mainSlideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        fade: true,
        asNavFor: '.thumbs'
    };

    thumbnailSlideConfig = {
        slidesToShow: 5,
        infinite: true,
        slidesToScroll: 1,
        asNavFor: '.main',
        dots: false,
        focusOnSelect: true,
        arrows: true,

        responsive: [
            {
                breakpoint: 768, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 2.5 // Adjust number of slides for smaller screens
                }
            }
            // Add more breakpoints and settings as needed
        ]
    };


    gameId: string | null = null;
    game: any;
    gallery: any;
    sanitizedAboutTheGame: any;
    private routeSub: Subscription | undefined;

    constructor(
        private route: ActivatedRoute,
        private gameDetailsService: GameDetailsService,
        private sanitizer: DomSanitizer,
    ) {
        this.gameId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.gameId = params['id'];
            this.loadGameDetail(this.gameId);
        });
    }

    loadGameDetail(gameId: any) {
        this.gameDetailsService.getGameDetails(gameId).subscribe(
            res => {
                this.game = res;
                this.gallery = this.game.about.gallery.galleryContent;
                console.log(this.game);
                this.sanitizedAboutTheGame = this.sanitizer.bypassSecurityTrustHtml(this.game.about.aboutTheGame);
            }
        )
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

}
