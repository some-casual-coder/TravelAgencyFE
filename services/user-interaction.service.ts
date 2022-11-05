import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'classes/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {

  API_PATH = `${environment.API_PATH}`;

  constructor(private httpClient: HttpClient) { }

  public findAllUsers() {
    return this.httpClient.get(this.API_PATH + "/users/all");
  }

  public findUserByEmail(email: string | undefined): Observable<User> {
    return this.httpClient.get<User>(this.API_PATH + "/users/findByEmail?email=" + email);
  }

  public resendVerificationEmail(email: string) {
    return this.httpClient.get(this.API_PATH + "/resendVerificationEmail?email=" + email);
  }

  public sendPasswordResetEmail(email: string) {
    return this.httpClient.get(this.API_PATH + "/user/resetPassword?email=" + email);
  }

  public changePassword(resetToken: string, newPassword: string) {
    const params = new HttpParams()
      .set('resetToken', resetToken)
      .set('newPassword', newPassword);
    return this.httpClient.get(this.API_PATH + "/user/changePassword", {params});
  }
}
