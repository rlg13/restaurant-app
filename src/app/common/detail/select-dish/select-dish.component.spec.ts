import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { SelectDishComponent } from './select-dish.component';

describe('SelectDishComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()],
      declarations: [SelectDishComponent]
    }).compileComponents();
  });


  it('should create', () => {
    const component = TestBed.createComponent(SelectDishComponent);
    expect(component).toBeTruthy();
  });
});
