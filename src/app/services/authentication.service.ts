import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
const TOKEN_KEY = 'my-token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await this.getItem(TOKEN_KEY);
    if (token){
      console.log('set token: ', token);
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email; password }):Observable<any> {
    return this.http.post(`https://reqres.in/api/login`,credentials).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        return from(this.setItem(TOKEN_KEY,token));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
      );
  }

  logout(): Promise<void> {
    return Promise.resolve().then(()=>{
      this.isAuthenticated.next(false);
      localStorage.clear();
    });
  }

  setItem(key, value) {
    return Promise.resolve().then(()=> {
      localStorage.setItem(key, value);
    });
  }

  getItem(key) {
    return Promise.resolve().then(()=> {
      return localStorage.getItem(key);
    });
  }


}