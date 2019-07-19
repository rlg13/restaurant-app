import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { SelectDishComponent } from './select-dish.component';

describe('SelectDishComponent', () => {
  let component: SelectDishComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()],
      declarations: [SelectDishComponent]
    }).compileComponents();
    component = TestBed.createComponent(SelectDishComponent).componentInstance;
  });


  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
