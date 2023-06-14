import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Especialista, tipoEspecialista } from 'src/app/models/especialista';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-formulario-especialista',
  templateUrl: './formulario-especialista.component.html',
  styleUrls: ['./formulario-especialista.component.scss'],
})
export class FormularioEspecialistaComponent {
  spinner: boolean = false;
  imgFile: any;
  especialistas: string[];
  imgForm: string = '';
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
    edad: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    especialidades: new FormControl(),
    imagenPerfil: new FormControl('', [Validators.required]),
  });
  constructor(private userSrv: AuthService, private router: Router) {
    this.especialistas = Object.values(tipoEspecialista);
    this.form.get('especialidades')?.addValidators(Validators.required);
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
          especialidades: this.form.value.especialidades ?? [],
          imagenPerfil: this.form.value.imagenPerfil,
          tipoUser: 'especialista',
          emailVerificado: false,
        };

        this.userSrv.guardar(user,this.imgFile).then(() => {
          Alert.mensajeConfirmacion(`Se registro exitoso!!!!!!!!`);
          console.log(`registro: sea registrado ${user.name}`);
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login')
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

  selectedValues: any[] = [];
  toggleSelection(item: any) {
    const index = this.selectedValues.indexOf(item);
    if (index > -1) {
      this.selectedValues.splice(index, 1);
    } else {
      this.selectedValues.push(item);
    }
    this.form.get('especialidades')?.patchValue(this.selectedValues);
  }
}
