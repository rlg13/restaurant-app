import { User } from './../../model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


export class FilterOrderParams {
  initialDate?: Date;
  endDate?: Date;
  user?: string;

  constructor({ initialDate = null, endDate = null, user = null }) {
    this.initialDate = initialDate;
    this.endDate = endDate;
    this.user = user;
  }


}

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {

  @Output() filterEvent: EventEmitter<FilterOrderParams> = new EventEmitter<FilterOrderParams>();

  public initialDate: Date;
  public endDate: Date;
  searchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initialDate = moment().subtract(3, 'd').toDate();
    this.endDate = moment().add(4, 'd').toDate();

    this.searchForm = new FormGroup({
      initialDateForm: new FormControl(this.initialDate, [Validators.required]),
      endDateForm: new FormControl(this.endDate, [Validators.required]),
    });
  }

  filter() {
    const params: FilterOrderParams = new FilterOrderParams({
      initialDate: this.initialDate,
      endDate: this.endDate,
      user: localStorage.getItem('userId')
    });
    this.filterEvent.emit(params);
  }

  checkDates() {
    
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
