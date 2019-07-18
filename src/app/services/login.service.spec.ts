import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from './login.service';
import { User } from '../model/user';
import { HttpParams } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [LoginService]
    });
    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return observable<User>', () => {
    const DUMMY_USER =
      new User({
        name: 'A name',
        password: 'A password'
      });


    service.login(DUMMY_USER).subscribe(user => {
      expect(user.name).toEqual('A name');
    });

    const req = httpMock.expectOne(LoginService.LOGIN_ENDPOINT);
    expect(req.request.method).toBe('POST');
    req.flush(DUMMY_USER);
  });

  it('should be call to logout api endpoint', () => {

    const DUMMY_PARAMS: HttpParams = new HttpParams().set('id', '4');
    service.logout(DUMMY_PARAMS).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${LoginService.LOGOUT_ENDPOINT}?id=4`);
    expect(req.request.method).toBe('DELETE');
    req.flush(DUMMY_PARAMS);
  });


});
