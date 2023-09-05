import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}

  public userLoginOn: boolean = false;

  private userLoginOnSubscription?: Subscription;

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.userLoginOnSubscription =
      this.authService.currentUserLoginOnSubject$.subscribe({
        next: (value) => {
          this.userLoginOn = value;
        },
      });
  }

  ngOnDestroy(): void {
    this.userLoginOnSubscription?.unsubscribe();
  }
}
