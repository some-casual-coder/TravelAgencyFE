import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  register(registerForm:NgForm){
    console.log("Form is submitted");
    this.userService.register(registerForm.value).pipe(takeUntil(this.destroy))
    .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
