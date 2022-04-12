import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurUpdateComponent } from './livreur-update.component';

describe('LivreurUdpateComponent', () => {
  let component: LivreurUpdateComponent;
  let fixture: ComponentFixture<LivreurUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreurUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreurUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
