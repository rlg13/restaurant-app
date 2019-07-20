import { Injectable } from '@angular/core';
import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { TranslateService } from '@ngx-translate/core';

import { Order } from 'src/app/model/order';

@Injectable()
export class OrderStateFilter implements ClrDatagridStringFilterInterface<Order> {
    constructor(private transtate: TranslateService) { }

    accepts(order: Order, search: string): boolean {
        const orderTranslate: string = this.transtate.instant(order.state);
        return orderTranslate.toLowerCase().includes(search.toLowerCase());
    }
}
