import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginResponse } from '../../auth/interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userLoginOn: boolean = false;
  public user: LoginResponse | null = null;

  private userLoginOnSubscription?: Subscription;
  private userDataSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userLoginOnSubscription =
      this.authService.currentUserLoginOnSubject$.subscribe({
        next: (value) => {
          this.userLoginOn = value;
        },
      });

    this.userDataSubscription =
      this.authService.currentUserDataSubject$.subscribe({
        next: (value) => {
          this.user = value;
        },
      });
  }

  ngOnDestroy(): void {
    this.userLoginOnSubscription?.unsubscribe();
    this.userDataSubscription?.unsubscribe();
  }
}
