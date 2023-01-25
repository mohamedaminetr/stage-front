import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererUserComponent } from './gerer-user.component';

describe('GererUserComponent', () => {
  let component: GererUserComponent;
  let fixture: ComponentFixture<GererUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
