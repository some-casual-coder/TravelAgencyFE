import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hotel } from 'classes/hotel';
import { User } from 'classes/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_PATH = `${environment.API_PATH}`;

  constructor(private httpClient: HttpClient) { }

  public addRoleToUser(roleData: NgForm) {
    let params = new HttpParams();
    params = params.set('email', roleData.value.email);
    params = params.set('role', roleData.value.role);
    return this.httpClient.post(this.API_PATH + "/addRoleToUser", params);
  }
}
