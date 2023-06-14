import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  private urlApiGit: string =
    'https://api.github.com/users/Mariano-Ovelar';
  constructor(private apiSrv: ApiService) {}

  getGit(): Observable<any> {
    return this.apiSrv.getData(this.urlApiGit);
  }
}
