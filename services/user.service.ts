import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_PATH = "http://localhost:8080";
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  public register(registrationData: any) {
    return this.httpClient.post(this.API_PATH + "/registerUser", registrationData, { headers: this.requestHeader });
  }

  public verifyAccount(verificationCode: String): Observable<boolean> {
    return this.httpClient.get(this.API_PATH + "/user/verifyUser?code=" + verificationCode, { headers: this.requestHeader }).pipe(map(value => <boolean>value));
  }

  // sendEmailForChecking() : Observable<boolean> { return this.http.get('http://127.0.0.1:5000/email').pipe(map(value => <boolean>value)); } }

  public login(loginData: any) {
    return this.httpClient.post(this.API_PATH + "/authenticate", loginData, { headers: this.requestHeader });
  }

  public forUser() {
    return this.httpClient.get(this.API_PATH + "/forUser", {
      responseType: 'text',
    });
  }
  public forAdmin() {
    return this.httpClient.get(this.API_PATH + "/forAdmin", {
      responseType: 'text',
    });
  }
  public forSuperAdmin() {
    return this.httpClient.get(this.API_PATH + "/forSuperAdmin", {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: [] = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            continue;
          }
        }
      }
    }

    return isMatch;
  }

}
