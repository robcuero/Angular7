import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    Usuario: '',
    Clave: '',
    recaptcha: ''
  }
persona ={
Nombre:'',
Apellido:'',
Correo:''
}

siteKey = '6LeHMmUaAAAAACGAiV_pk7nA4R70I51n5G5FF_7l'
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  handleSuccess(event){
    this.formModel.recaptcha = event;
  }

  onSubmit(form: NgForm) {
if(this.formModel.recaptcha === ""){
this.toastr.error("NO ERES HUMANO OK");
return;

}

    this.service.login(form.value).subscribe(
      (res: any) => {

        this.persona.Nombre = res.nombre;
        this.persona.Apellido = res.apellido;
        this.persona.Correo = res.correo;    
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }
}
