import {Component, Input} from '@angular/core';
import {DealsCardComponent} from "../../deals-card/deals-card.component";

@Component({
  selector: 'app-deals-cards',
  standalone: true,
    imports: [
        DealsCardComponent
    ],
  templateUrl: './deals-cards.component.html',
  styleUrl: './deals-cards.component.scss'
})
export class DealsCardsComponent {
  @Input() title: any;
  @Input() dealsCards: any;

}
