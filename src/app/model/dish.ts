import { DishType } from './dish-type.enum';

export class Dish {
    id: number;
    type: DishType;
    name: string;

    constructor(id = null, type = null, name = null) {
        this.id = id;
        this.type = type;
        this.name = name;
    }
}
