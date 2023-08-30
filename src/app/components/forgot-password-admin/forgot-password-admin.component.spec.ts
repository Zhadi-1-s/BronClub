import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordAdminComponent } from './forgot-password-admin.component';

describe('ForgotPasswordAdminComponent', () => {
  let component: ForgotPasswordAdminComponent;
  let fixture: ComponentFixture<ForgotPasswordAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
