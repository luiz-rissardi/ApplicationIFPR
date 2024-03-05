import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteOffSaleComponent } from './writeOffSale.component';

describe('WriteOffSaleComponent', () => {
  let component: WriteOffSaleComponent;
  let fixture: ComponentFixture<WriteOffSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteOffSaleComponent]
    });
    fixture = TestBed.createComponent(WriteOffSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
