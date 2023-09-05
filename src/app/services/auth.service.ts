import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, take, throwError } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
} from '../auth/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public user: any = null;

  public login({ email, password }: LoginRequest): Observable<LoginResponse> {
    return this.http
      .get<LoginResponse>('../../assets/data.json')
      .pipe(take(1), catchError(this.handleErrors));
  }

  private handleErrors(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message, error.status);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
