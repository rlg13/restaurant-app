import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { LoginService, User } from 'src/app/services/login.service';

@Component({
  selector: 'app-search',
  providers: [
    LoginService,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public user: string;
  public initialDate: Date;
  public endDate: Date;
  public opened: boolean;
  public orderDay: Date;
  public firstsOptions: string;
  public secondsOptions: string;
  public dessertsOptions: string;



  constructor(private _service: LoginService) { }

  ngOnInit() {
    this._service.checkCredentials();
    this.user = this._service.getUsername();
    this.opened = false;
  }

  logout() {
    this._service.logout();
  }


}
