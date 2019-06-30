import { DetailOrderComponent } from './../../detail-order/detail-order.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-results',
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss']
})
export class FilterResultsComponent implements OnInit {

  @ViewChild('detail', {static: true}) detail: DetailOrderComponent;
  constructor() { }

  ngOnInit() {
  }

  openDetail() {
    this.detail.showModal  = true;
    this.detail.create = false;
  }

}
