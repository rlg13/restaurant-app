import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { User } from './../../../model/user';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @Input() showNewUserModal: boolean;
  @Input() userCreate: User;

  @Output() createEvent: EventEmitter<User> = new EventEmitter<User>();

  newUserForm = new FormGroup({
    userCreate:
      new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      })
  });

  constructor() { }

  ngOnInit(): void { }

  cancelCreateUser(): void {
    this.newUserForm.patchValue({
      userCreate: {
        username: '',
        password: ''
      }
    });
    this.showNewUserModal = false;
  }

  createUser(): void {
    this.userCreate = new User({ name: this.newUserForm.value.userCreate.username, password: this.newUserForm.value.userCreate.password });
    this.createEvent.emit(this.userCreate);
    this.showNewUserModal = false;
  }
}
