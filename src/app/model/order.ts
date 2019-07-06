import { User } from './user';
import { OrderState } from './order-state.enum';
import { Dish } from './dish';
export class Order {
    id?: number;
    user?: User;
    dayOrder?: Date;
    state?: OrderState;
    firstDish?: Dish;
    secondDish?: Dish;
    dessert?: Dish;

    constructor({ id = null, user = null, dayOrder = null, state = null, firstDish = null, secondDish = null, dessert = null }) {
        this.id = id;
        this.user = user;
        this.dayOrder = dayOrder;
        this.state = state;
        this.firstDish = firstDish;
        this.secondDish = secondDish;
        this.dessert = dessert;
    }

}
