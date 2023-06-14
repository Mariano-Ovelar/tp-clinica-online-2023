import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  formularioPaciente: boolean = false;
  formularioEspecialista: boolean = false;
  /* spinner: boolean = false;
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
  });
  constructor(private userSrv: AuthService, private router: Router) {}
  ngOnInit() {}
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
          rol: 'jugardor',
        };

        this.userSrv.guardar(user);
        this.userSrv
          .login(this.form.value)
          .then(() => {
            console.log('Se logeo el usurio');
          })
          .finally(() => {
            this.spinner = false;
            if (this.userSrv.usuario) {
              Alert.mensajeConfirmacion(`Se registro exitoso!!!!!!!!`);
              console.log(`registro: sea registrado ${user.name}`);
              setTimeout(() => {
                location.reload();
              }, 1500);
            }
          });
      }
    } else {
      Alert.mensajeError('Error!!!', 'Las contraseñas no coisiden!!!!');
      this.spinner = false;
    }
    this.form.enable();
  }
  validarPassword() {
    return this.form.value.password === this.form.value.confirmPassword;
  } */

  selecionar(formulario: string) {
    if (formulario == 'paciente') {
      this.formularioPaciente = true;
    } else {
      this.formularioEspecialista = true;
    }
  }
}
