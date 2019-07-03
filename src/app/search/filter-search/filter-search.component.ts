import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {

  public initialDate: Date;
  public endDate: Date;

  searchForm: FormGroup;

  constructor() { }

  ngOnInit() {


    this.initialDate = moment().add(-3, 'd').toDate();
    this.endDate = moment().add(4, 'd').toDate();

    this.searchForm = new FormGroup({
      initialDateForm: new FormControl(this.initialDate, [Validators.required]),
      endDateForm: new FormControl(this.endDate, [Validators.required]),
    });
  }

  filter() {

    console.log('invoke filter');
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
