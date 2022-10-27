import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  verificationCode!: string;

  verified: boolean = false;

  ngOnInit(): void {
    this.getCode();
    this.userService.verifyAccount(this.verificationCode).pipe(takeUntil(this.destroy))
    .subscribe(
      response =>this.verified = response);
  }


  getCode() {
    this.route.queryParams
      .subscribe(params => {
        this.verificationCode = params['code'];
        console.log(this.verificationCode);
      }
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}

