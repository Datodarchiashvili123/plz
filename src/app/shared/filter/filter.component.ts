import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  toggleStates: boolean[] = []; // Array to store the state of each checkbox
  openClose = false;
  @Input() text = 'Price';
  items = ['Action', 'Adventure', 'Casual'];

  constructor() {
    // Initialize the toggle states array with false values for each checkbox
    this.toggleStates = Array(3).fill(false); // Change '3' to the number of checkboxes you have
  }

  toggleFilters(index: number) {
    // Toggle the state of the checkbox at the specified index
    this.toggleStates[index] = !this.toggleStates[index];
  }
  openCloseDropdown(){
    this.openClose = !this.openClose;
  }
}
