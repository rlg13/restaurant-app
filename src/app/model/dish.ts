import { DishType } from './dish-type.enum';

export class Dish {
    id?: number;
    type?: DishType;
    name?: string;

    constructor({ id = null, type = null, name = null }) {
        this.id = id;
        this.type = type;
        this.name = name;
    }

    get isValid() {
        return this.id !== null;
    }

    get isFirst() {
        return this.type === DishType.FIRST;
    }

    get isSecond() {
        return this.type === DishType.SECOND;
    }

    get isDessert() {
        return this.type === DishType.DESSERT;
    }
}
