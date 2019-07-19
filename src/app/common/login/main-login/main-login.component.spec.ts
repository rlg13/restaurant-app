import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from 'src/app/services/login.service';
import { CreateUserComponent } from './../create-user/create-user.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TestBed } from '@angular/core/testing';

import { MainLoginComponent } from './main-login.component';

describe('MainLoginComponent', () => {
  let component: MainLoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()],
      declarations: [MainLoginComponent, CreateUserComponent],
      providers: [LoginService]
    }).compileComponents();
    component = TestBed.createComponent(MainLoginComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
