import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {

    this.service.register().subscribe(data=> console.log)
    this.router.navigateByUrl('/user/login');
    this.toastr.success('Cuenta creada con exito');
  }

}
