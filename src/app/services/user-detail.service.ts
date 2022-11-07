import { Injectable } from '@angular/core';
import { ToastController,AlertController,LoadingController  } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

const TOKEN_KEY = 'my-token';


@Injectable({
  providedIn: 'root',
})

export class UserDetailService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private http: HttpClient, public toast: ToastController,public alertController: AlertController,public loadingController: LoadingController,private _router: Router) { 
    this.loadToken();
  }


  setItem(key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  }

  getItem(key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  }



  async loadToken() {
    const token = await this.getItem(TOKEN_KEY);
    if (token && token) {
      console.log('set token: ', token);
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }



  login(credentials: { email; password }): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        return from(this.setItem(TOKEN_KEY,token));
        // return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
      );
  }


  logout() {
    this.isAuthenticated.next(false);
    return localStorage.removeItem(TOKEN_KEY);
  }


}