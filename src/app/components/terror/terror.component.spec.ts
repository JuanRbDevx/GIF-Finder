import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrorComponent } from './terror.component';

describe('TerrorComponent', () => {
  let component: TerrorComponent;
  let fixture: ComponentFixture<TerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
