import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'classes/user';
import { Subject, takeUntil } from 'rxjs';
import { UserInteractionService } from 'services/user-interaction.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  userEmail: string | undefined;

  private destroy: Subject<void> = new Subject<void>;

  constructor(private interactionService:UserInteractionService) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  setUserEmail(email:string){
    this.userEmail = email;
  }

  findAll(){
    this.interactionService.findAllUsers().pipe(takeUntil(this.destroy)).subscribe({
      next: (response:any) => {this.users = response.content;},
      error: error => console.log(error)
    });
  }

}
