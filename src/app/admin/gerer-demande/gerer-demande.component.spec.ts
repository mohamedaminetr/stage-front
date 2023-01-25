import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererDemandeComponent } from './gerer-demande.component';

describe('GererDemandeComponent', () => {
  let component: GererDemandeComponent;
  let fixture: ComponentFixture<GererDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
