import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurListeComponent } from './livreur-liste.component';

describe('LivreurListeComponent', () => {
  let component: LivreurListeComponent;
  let fixture: ComponentFixture<LivreurListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreurListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
