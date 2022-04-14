import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatUpdateComponent } from './plat-update.component';

describe('PlatUpdateComponent', () => {
  let component: PlatUpdateComponent;
  let fixture: ComponentFixture<PlatUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
