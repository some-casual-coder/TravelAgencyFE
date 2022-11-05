import { Injectable } from '@angular/core';
import { User } from 'classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: string[]){
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): []{
    return JSON.parse(localStorage.getItem("roles")!);
  }

  public setToken(jwtToken: string){
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string{
    return localStorage.getItem("jwtToken")!;
  }

  public setUser(user: User){
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(): User{
    return JSON.parse(localStorage.getItem("user")!);
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }
}
