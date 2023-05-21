import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeViewComponent } from './receipe-view.component';

describe('ReceipeViewComponent', () => {
  let component: ReceipeViewComponent;
  let fixture: ComponentFixture<ReceipeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceipeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceipeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
