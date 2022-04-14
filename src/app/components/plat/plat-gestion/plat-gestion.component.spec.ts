import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatGestionComponent } from './plat-gestion.component';

describe('PlatGestionComponent', () => {
  let component: PlatGestionComponent;
  let fixture: ComponentFixture<PlatGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
