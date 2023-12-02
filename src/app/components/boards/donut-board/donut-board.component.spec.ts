import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutBoardComponent } from './donut-board.component';

describe('DonutBoardComponent', () => {
  let component: DonutBoardComponent;
  let fixture: ComponentFixture<DonutBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonutBoardComponent]
    });
    fixture = TestBed.createComponent(DonutBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
