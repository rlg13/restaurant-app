import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FilterOrderParams } from './filter-order-params';
import { ConstantsStorage } from './../../../utils/constants-storage';

import * as moment from 'moment';


@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit, AfterViewInit {

  @Output() filterEvent: EventEmitter<FilterOrderParams> = new EventEmitter<FilterOrderParams>();

  public initialDate: Date;
  public endDate: Date;
  searchForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initialDate = moment().subtract(3, 'd').toDate();
    this.endDate = moment().add(4, 'd').toDate();

    this.searchForm = new FormGroup({
      initialDateForm: new FormControl(this.initialDate, [Validators.required]),
      endDateForm: new FormControl(this.endDate, [Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    this.filter();
  }

  filter(): void {
    const params: FilterOrderParams = new FilterOrderParams({
      initialDate: this.initialDate,
      endDate: this.endDate,
      user: localStorage.getItem(ConstantsStorage.USER_ID)
    });
    this.filterEvent.emit(params);
  }

  checkDates(): void {

    if (!this.initialDate) {
      this.searchForm.patchValue({
        initialDateForm: null
      });

      if (!this.endDate) {
        this.searchForm.patchValue({
          endDateForm: null
        });
      }
    }
  }

}
