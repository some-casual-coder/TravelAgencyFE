import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'classes/user';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from 'services/admin.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit, OnDestroy {

  message: string | undefined;
  users: User[] | undefined;
  userEmail: string | undefined;

  private destroy: Subject<void> = new Subject<void>;

  constructor(private userService: UserService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.forSuperAdmin();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  forSuperAdmin() {
    this.userService.forSuperAdmin().pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response) => this.message = response,
        error: (error) => console.log(error),
      });
  }

  getAllUsers() {
    this.adminService.findAllUsers().pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: any) => {
          this.users = response.content;
        },
        error: (error) => console.log(error)
      });
  }

  setUserEmail(email:string){
    this.userEmail = email;
  }


}
