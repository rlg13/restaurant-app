import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {
  private static milisecondsPerDay = 24 * 60 * 60 * 1000;

  public initialDate: Date;
  public endDate: Date;

  searchForm = new FormGroup({
    initialDateForm: new FormControl('', Validators.required),
    endDateForm: new FormControl('', Validators.required),
    });

  constructor() { }

  ngOnInit() {

    this.initialDate = new Date((new Date()).getTime() - (3 * FilterSearchComponent.milisecondsPerDay));
    this.endDate = new Date((new Date()).getTime() + (4 * FilterSearchComponent.milisecondsPerDay));

    this.searchForm.patchValue({
      initialDateForm: this.initialDate.toJSON(),
      endDateForm: this.endDate.toJSON()
    });
  }

  filter() {
    //invoke filter system
  }


}
