import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  @Input() create: boolean;
  @Input() showModal: boolean;
  @Output() emitCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

 /* emitClose() {
    this.showModal = false;
    this.emitCloseEvent.emit(false);
  }*/

}
