import { FormGroup, ValidatorFn } from '@angular/forms';

import { Constants } from './../utils/constants';
import { Dish } from './../../../model/dish';

export const AlmostOneDishValidator: ValidatorFn = (fg: FormGroup) => {
    const fistValue: Dish = fg.get([Constants.FIRST_DISH]).value || new Dish({});
    const secondValue: Dish = fg.get([Constants.SECOND_DISH]).value || new Dish({});
    const dessertValue: Dish = fg.get([Constants.DESSERT]).value || new Dish({});

    if (!fistValue.isValid && !secondValue.isValid && !dessertValue.isValid) {
        return {
            allmostOne: true
        };
    }
    return null;
};