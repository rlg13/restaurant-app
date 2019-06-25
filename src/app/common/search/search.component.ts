import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-search',
  providers: [LoginService],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(private _service: LoginService) { }

  ngOnInit() {
    this._service.checkCredentials();
  }

  logout(){
    this._service.logout();
  }

}
