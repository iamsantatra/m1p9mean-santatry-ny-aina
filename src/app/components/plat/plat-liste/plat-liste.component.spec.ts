import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatListeComponent } from './plat-liste.component';

describe('PlatListeComponent', () => {
  let component: PlatListeComponent;
  let fixture: ComponentFixture<PlatListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
