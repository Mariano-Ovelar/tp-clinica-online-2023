import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.component.html',
  styleUrls: ['./detalle-admin.component.scss'],
})
export class DetalleAdminComponent {
  @Input() usuario?: User;
}
