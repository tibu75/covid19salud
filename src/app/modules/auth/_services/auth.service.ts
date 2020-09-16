import { Injectable, OnDestroy, NgZone } from "@angular/core";
import { Observable, BehaviorSubject, of, Subscription } from "rxjs";
import { map, catchError, switchMap, finalize } from "rxjs/operators";
import { UserModel } from "../_models/user.model";
import { AuthModel } from "../_models/auth.model";
import { AuthHTTPService } from "./auth-http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private isLoadingSubject: BehaviorSubject<boolean>;
  private authLocalStorageToken = `${environment.TOKEN}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;

  auth2: any;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  constructor(
    private ngZone: NgZone,
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(documento: string, password: string): Observable<UserModel> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(documento, password).pipe(
      map((auth: any) => {
        const result = this.setAuthFromLocalStorage(auth);
        console.log(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.ngZone.run(() => {
      this.router.navigateByUrl("/auth/login");
    });
  }
  /* this.router.navigate(["/auth/login"], {
      queryParams: {},
    }); */

  getUserByToken(): Observable<UserModel> {
    const token = this.getAuthFromLocalStorage();
    console.log("Token", token);
    if (!token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    // console.log("paso2");
    return this.authHttpService.getUserByToken(token).pipe(
      map((user: UserModel) => {
        // console.log("paso3", user);
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.documento, user.password)),
      catchError((err) => {
        console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(documento: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(documento)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    const token = auth.token;

    // store auth token/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(token));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
