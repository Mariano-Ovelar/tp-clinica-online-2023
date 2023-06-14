import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.scss'],
})
export class FormularioPacienteComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    edad: new FormControl(0, [Validators.required]),
    dni: new FormControl(0, [Validators.required]),
    obraSocial: new FormControl('', [Validators.required]),
    imagenPerfil: new FormControl('', [Validators.required]),
    imagenPerfil2: new FormControl('', [Validators.required]),
  });
  spinner: boolean = false;
  imgFile: any;
  imgFile2: any;
  imgForm: string = '';
  imgForm2: string = '';

  constructor(private userSrv: AuthService, private router: Router) {
  }

  capturarFile($event: any) {
    try {
      const file: File = $event.target.files[0];
      const reader = new FileReader();
      this.imgFile = file;
      console.log('Antes de Entrar');

      reader.onload = (e: any) => {
        this.imgForm = e.target.result;
        console.log('Entro');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      alert(err);
    }
  }
  capturarFile2($event: any) {
    try {
      const file: File = $event.target.files[0];
      const reader = new FileReader();
      this.imgFile2 = file;

      reader.onload = (e: any) => {
        this.imgForm2 = e.target.result;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      alert(err);
    }
  }
  async signUp() {
     this.spinner = true;

    if (this.form.valid && this.validarPassword()) {
      this.form.disable();
      const resUsuario: any = await this.userSrv
        .registro(this.form.value)
        .catch((err) => {
          this.spinner = false;
          console.log(err);
          Alert.mensajeError('Error!!!', 'Este correo ya esta registrado!!!!');
        });
      if (resUsuario) {
        const user = {
          uid: resUsuario.user.uid,
          name: resUsuario.user.displayName,
          email: resUsuario.user.email,
          lastName: this.form.value.lastName ?? '',
          dni: this.form.value.dni ?? 0,
          edad: this.form.value.edad ?? 0,
          imagenPerfil: this.form.value.imagenPerfil,
          imagenPerfil2: this.form.value.imagenPerfil2,
          tipoUser: 'paciente',
          emailVerificado: true,
        };

        this.userSrv.guardar(user,this.imgFile,this.imgFile2).then(() => {
          Alert.mensajeConfirmacion(`Se registro exitoso!!!!!!!!`);
          console.log(`registro: sea registrado ${user.name}`);
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login');
          }, 1500);
        });

        this.spinner = false;
      }
    } else {
      Alert.mensajeError('Error!!!', 'Las contraseñas no coisiden!!!!');
      this.spinner = false;
    }
    this.form.enable(); 
  }
  validarPassword() {
    return this.form.value.password === this.form.value.confirmPassword;
  }
}
