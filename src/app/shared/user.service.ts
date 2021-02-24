import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
//readonly BaseURI = 'http://loaizaapi-001-site1.htempurl.com'; 
  readonly BaseURI = ' https://localhost:44376'; 
 


  formModel = this.fb.group({
    Usuario: ['', Validators.required],
    Nombre: ['', Validators.required],
    Apellido: ['', Validators.required],
    Correo: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });


  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }



 
  register() {
      var body = {
          Usuario: this.formModel.value.Usuario,
          Nombre: this.formModel.value.Nombre,
          Apellido: this.formModel.value.Apellido,
          Correo: this.formModel.value.Correo,
          Clave: this.formModel.value.Passwords.Password,
          ConfirmaClave: this.formModel.value.Passwords.ConfirmPassword
    };
    return this.http.post(this.BaseURI+'/Usuarios', body);
  }

  login(formData) {

   
    
    
    return this.http.post(this.BaseURI + '/login', formData);
  }
//arreglar
  getUserProfile() {
    return this.http.get(this.BaseURI + '/Usuarios/2');
  }
}

