import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  verNavLink: boolean = true;
  usuario = this.userSrv.usuario;
  estaLogeado = this.userSrv.estaLogeado;
  showInfoBox: boolean = false;

  toggleInfoBox(): void {
    this.showInfoBox = !this.showInfoBox;
  }
  constructor(private userSrv: AuthService, private router: Router) {}

  ngOnInit() {}
  mostrarNavLink() {
    this.verNavLink = !this.verNavLink;
  }

  logout() {
    Alert.mensajeAdvertecia('¿Quiere desconetarce?', '', 'Si').then(
      (result: any) => {
        if (result.isConfirmed) {
          Alert.mensajeConfirmacion('Nos vemos pronto.');
          setTimeout(() => {
            this.userSrv
              .logout()
              .then((res) => {
                console.log('El usuario salio!!!!!');
                this.usuario = null;
                this.router.navigateByUrl('/auth/login').then(() => {
                  location.reload();
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }, 1500);
        }
      }
    );
  }
}
