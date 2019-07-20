import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from 'src/app/services/login.service';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TestBed } from '@angular/core/testing';

import { CreateDishComponent } from './create-dish.component';

describe('CreateDishComponent', () => {
  let component: CreateDishComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()],
      declarations: [CreateDishComponent],
      providers: [LoginService]
    }).compileComponents();
    component = TestBed.createComponent(CreateDishComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
