import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsCardsComponent } from './deals-cards.component';

describe('DealsCardsComponent', () => {
  let component: DealsCardsComponent;
  let fixture: ComponentFixture<DealsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
