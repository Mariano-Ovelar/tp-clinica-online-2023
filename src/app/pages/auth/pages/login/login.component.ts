import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  usuarioStorage: any = {};
  bloquearButtons: boolean = false;
  spinner: boolean = false;
  usuarios?: any[] = [];
  emails: string[] = [
    'marianoovelar200@gmail.com',
    'cintiaovelaruba@gmail.com',
    'ovelarmariano20@gmail.com',
    'familiaovelar200@gmail.com',
  ];
  admin: any;
  paciente1: any;
  especialista1: any;
  especialista2: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userSrv: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.userSrv.getUsuarios().subscribe((res) => {
      this.admin = res.find((objeto) => objeto.email === this.emails[0]);
      this.especialista1 = res.find((objeto) => objeto.email === this.emails[1]);
      this.especialista2 = res.find((objeto) => objeto.email === this.emails[2]);
      this.paciente1 = res.find((objeto) => objeto.email === this.emails[3]);
    });
  }
  login() {
    this.spinner = true;
    this.bloquearButtons = true;
    this.userSrv
      .login(this.form.value)
      .then((res: any) => {
        this.form.disable();
        console.log(`login: Bienvenido ${res.name}`);
        Alert.mensajeConfirmacion(`Bienvenido ${res.name}!!!!!!!!`);
      })
      .catch((err: any) => {
        this.bloquearButtons = false;
        console.log(err);
        Alert.mensajeError(
          'Error al tratar de entrar:',
          err,
          '<p>Esta registrado? en caso de no tener cuenta tocar <a href="/auth/sign-up">aca</a><p>'
        );
      })
      .finally(() => {
        this.spinner = false;
        this.form.enable();
        if (this.userSrv.usuario) {
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      });
  }

  selecionUsuario(usuario: any) {
    this.form.get('email')?.setValue(usuario.email);
    this.form.get('password')?.setValue('123456');
  }
}
