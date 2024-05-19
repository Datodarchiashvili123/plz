import { Component } from '@angular/core';
import {SearchComponent} from "../../search/search.component";
import {TagComponent} from "../../tag/tag.component";
import {FilterComponent} from "../../filter/filter.component";

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
export class FiltersComponent {

}
