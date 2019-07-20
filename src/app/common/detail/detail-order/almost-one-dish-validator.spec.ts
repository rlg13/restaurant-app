import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';

import { AlmostOneDishValidator } from './almost-one-dish-validator';
import { Dish } from './../../../model/dish';
import { DishType } from './../../../model/dish-type.enum';

const EXPETED_VALIDATION: ValidationErrors = { allmostOne: true };

const EMPTY_DISH: Dish = new Dish({});
const VALUE_DISH: Dish = new Dish({ id: 1, name: 'A name', type: DishType.FIRST });

describe('AlmostOneDishValidator', () => {

  it('if all empty should be return validator key true', () => {
    const form = new FormGroup({
      firstSeletedValue: new FormControl(EMPTY_DISH, []),
      secondSeletedValue: new FormControl(EMPTY_DISH, []),
      dessertSeletedValue: new FormControl(EMPTY_DISH, [])
    });
    expect(AlmostOneDishValidator(form)).toEqual(EXPETED_VALIDATION);
  });

  it('if allmost one control is not empty should be return null ', () => {
    const form = new FormGroup({
      firstSeletedValue: new FormControl(EMPTY_DISH, []),
      secondSeletedValue: new FormControl(EMPTY_DISH, []),
      dessertSeletedValue: new FormControl(EMPTY_DISH, [])
    });
    form.patchValue({ secondSeletedValue: VALUE_DISH });

    expect(AlmostOneDishValidator(form)).toBeNull();
  });

});
