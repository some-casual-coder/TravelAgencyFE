import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserAuthService } from 'services/user-auth.service';
import { UserService } from 'services/user.service';
import '../../assets/js/custom.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterContentInit {

  private destroy: Subject<void> = new Subject<void>;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    protected userService: UserService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.loadScript('../../assets/js/custom.js');
  }
  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
