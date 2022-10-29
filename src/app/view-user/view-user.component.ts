import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'classes/user';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AdminService } from 'services/admin.service';

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

  constructor(private adminService: AdminService) { }

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
    this.adminService.findUserByEmail(this.email).pipe(takeUntil(this.destroy))
    .subscribe({
      next: response => {
        this.user = response;
      },
      error: error => console.error(error)
    });
  }

  addRoleToUser(roleForm:NgForm){
    roleForm.controls['email'].setValue(this.email);
    // console.log(roleForm.value.role);
    this.adminService.addRoleToUser(roleForm).pipe(takeUntil(this.destroy))
    .subscribe({
      next:response =>  alert("Successfull"),
      error: error => console.error(error)
    });
  }

}
