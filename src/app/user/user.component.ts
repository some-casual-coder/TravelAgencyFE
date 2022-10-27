import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  message:string | undefined;

  private destroy: Subject<void> = new Subject<void>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser(){
    this.userService.forUser().pipe(takeUntil(this.destroy))
    .subscribe({
      next: (response) => {
        console.log(response);
        this.message = response;
      },
      error: (error) => console.log(error),
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
