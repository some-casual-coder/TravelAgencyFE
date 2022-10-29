import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_PATH = "http://localhost:8080";
  // requestHeader = new HttpHeaders(
  //   { "No-Auth": "True" }
  // );

  constructor(private httpClient: HttpClient) { }

  public forAdmin() {
    return this.httpClient.get(this.API_PATH + "/forAdmin", {
      responseType: 'text',
    });
  }

  public findAllUsers(){
    return this.httpClient.get(this.API_PATH + "/users/all");
  }

  public findUserByEmail(email: string | undefined): Observable<User>{
    return this.httpClient.get<User>(this.API_PATH + "/users/findByEmail?email=" + email);
  }

  public addRoleToUser(roleData: NgForm){
    let params = new HttpParams();
    params = params.set('email', roleData.value.email);
    params = params.set('role', roleData.value.role);
    return this.httpClient.post(this.API_PATH + "/addRoleToUser", params);
  }
}
