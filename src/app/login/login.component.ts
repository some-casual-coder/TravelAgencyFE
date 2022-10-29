import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserAuthService } from 'services/user-auth.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: any) => {
          this.userAuthService.setToken(response.jwtToken);
          const responseRoles = response.user.roles;
          let roles: string[] = [];
          responseRoles.forEach((role: { name: string; }) => roles.push(role.name));
          console.log(roles);
          this.userAuthService.setRoles(roles);
          if (roles.includes('ROLE_SUPER_ADMIN')) {
            this.router.navigate(['/superadmin']);
            return;
          }
          else if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
            return;
          }
          else if (roles.includes('ROLE_HOST')) {
            this.router.navigate(['/host']);
            return;
          }
          else {
            this.router.navigate(['/user']);
          }
        },
        error: (error) => console.log(error),
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
