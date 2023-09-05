import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  take,
  tap,
  throwError,
} from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
} from '../auth/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserLoginOnSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(localStorage.getItem('user') ? true : false);
  public currentUserDataSubject$: BehaviorSubject<LoginResponse | null> =
    new BehaviorSubject<LoginResponse | null>(
      localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null
    );

  constructor(private http: HttpClient) {}

  get userData$(): Observable<LoginResponse | null> {
    return this.currentUserDataSubject$.asObservable();
  }

  get isLogged$(): Observable<boolean> {
    return this.currentUserLoginOnSubject$.asObservable();
  }

  public login({ email, password }: LoginRequest): Observable<LoginResponse> {
    return this.http.get<LoginResponse>('../../assets/data.json').pipe(
      take(1),
      catchError(this.handleErrors),
      tap((user: LoginResponse) => {
        this.currentUserLoginOnSubject$.next(true);
        this.currentUserDataSubject$.next(user);
      }),
      tap((user: LoginResponse) => this.setLocalStorage(user))
    );
  }

  public setLocalStorage(user: LoginResponse) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleErrors(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message, error.status);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUserLoginOnSubject$.next(false);
    this.currentUserDataSubject$.next(null);
  }
}
