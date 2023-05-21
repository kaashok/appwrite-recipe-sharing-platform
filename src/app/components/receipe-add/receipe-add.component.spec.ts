import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeAddComponent } from './receipe-add.component';

describe('ReceipeAddComponent', () => {
  let component: ReceipeAddComponent;
  let fixture: ComponentFixture<ReceipeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceipeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceipeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
