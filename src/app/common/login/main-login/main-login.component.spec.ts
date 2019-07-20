import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ClarityModule } from '@clr/angular';

import { TranslateModule } from '@ngx-translate/core';

import { LoginService } from './../../../services/login.service';
import { CreateUserComponent } from './../create-user/create-user.component';
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
