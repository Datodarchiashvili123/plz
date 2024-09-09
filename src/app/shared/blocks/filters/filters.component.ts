import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchComponent} from "../../search/search.component";
import {TagComponent} from "../../tag/tag.component";
import {FilterComponent} from "../../filter/filter.component";
import {SearchService} from "../../../services/search.service";
import {FiltersService} from "../../../services/filters.service";

type FilterType = 'price' | 'developers' | 'publishers' | 'genres' | 'primaryPlatforms';


@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [
        SearchComponent,
        TagComponent,
        FilterComponent
    ],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
    genres = [
        {
            genreId: 1,
            name: "Adventure"
        }];
    developers: any;
    publishers: any;
    platforms: any;


    @Output() filtersChanged = new EventEmitter<any>();

    constructor(private filtersService: FiltersService) {

    }

    ngOnInit() {
        this.filtersService.getGenres().subscribe((res: any) => {
            console.log(res);
            this.genres = res.genres;
        });
        this.filtersService.getDevelopers().subscribe((res: any) => {
            console.log(res);
            this.developers = res.developers;
        });
        this.filtersService.getPublishers().subscribe((res: any) => {
            console.log(res);
            this.publishers = res.publishers;
        });
        this.filtersService.getPlatforms().subscribe((res: any) => {
            console.log(res);
            this.platforms = res.platforms;
        })
    }



    // Example filter data structure
    filters: Partial<Record<FilterType, any>> = {
        price: '',
        developers: [],
        publishers: [],
        genres: [],
        primaryPlatforms: [],
    };

    onFilterChange(filterType: FilterType, value: any) {
        this.filters[filterType] = value;
        this.filtersChanged.emit(this.filters);
    }

}
