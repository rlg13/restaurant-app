import { FormGroup, ValidatorFn } from '@angular/forms';
import { Dish } from 'src/app/model/dish';

export const AlmostOneDishValidator: ValidatorFn = (fg: FormGroup) => {
    const fistValue: Dish = fg.get(['firstSeletedValue']).value || new Dish({});
    const secondValue: Dish = fg.get(['secondSeletedValue']).value || new Dish({});
    const dessertValue: Dish = fg.get(['dessertSeletedValue']).value || new Dish({});

    if (!fistValue.isValid && !secondValue.isValid && !dessertValue.isValid) {
        return {
            allmostOne: true
        };
    }
    return null;
};