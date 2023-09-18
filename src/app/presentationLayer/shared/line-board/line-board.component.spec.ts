import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBoardComponent } from './line-board.component';

describe('LineBoardComponent', () => {
  let component: LineBoardComponent;
  let fixture: ComponentFixture<LineBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineBoardComponent]
    });
    fixture = TestBed.createComponent(LineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
