import { Component } from '@angular/core';
import { GitService } from 'src/app/services/git.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss'],
})
export class QuienSoyComponent {
  datosPersona:any={};
  constructor(private apiGitSvc: GitService) {

  }
  ngOnInit() {
    this.llenarData();
  }
  llenarData() {
    this.apiGitSvc.getGit().subscribe((data) => {
      this.datosPersona = data;
    });
  }
}
