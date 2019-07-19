import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()],
      declarations: [CreateUserComponent]
    }).compileComponents();
    component = TestBed.createComponent(CreateUserComponent).componentInstance;
 });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
