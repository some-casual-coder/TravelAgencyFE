import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'classes/user';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AdminService } from 'services/admin.service';
import { UserInteractionService } from 'services/user-interaction.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, OnDestroy, OnChanges {

  @Input() email: string | undefined;

  display: boolean = false;
  user!:User;

  private destroy:Subject<void> = new Subject<void>;

  constructor(private userInteractionService: UserInteractionService, private adminService:AdminService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUserDetails();
    setTimeout(() => {
      if(this.email != undefined){
        this.display = true;
      }
    }, 400);

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getUserDetails(){
    this.userInteractionService.findUserByEmail(this.email).pipe(takeUntil(this.destroy))
    .subscribe({
      next: (response: User) => {
        this.user = response;
      },
      error: (error: any) => console.error(error)
    });
  }

  addRoleToUser(roleForm:NgForm){
    roleForm.controls['email'].setValue(this.email);
    this.adminService.addRoleToUser(roleForm).pipe(takeUntil(this.destroy))
    .subscribe({
      next:(response: any) =>  alert("Successfull"),
      error: (error: any) => console.error(error)
    });
  }

}
