import { Order } from 'src/app/model/order';
import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { TranslateService } from '@ngx-translate/core';


export class OrderStateFilter implements ClrDatagridStringFilterInterface<Order> {
    constructor(private transtate: TranslateService) { }

    accepts(order: Order, search: string): boolean {
        const orderTranslate: string = this.transtate.instant(order.state);
        return (orderTranslate.toLowerCase().indexOf(search.toLowerCase())) >= 0;

    }
}