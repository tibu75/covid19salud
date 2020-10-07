// tslint:disable-next-line: quotemark
import { Injectable, OnDestroy, NgZone } from "@angular/core";
// tslint:disable-next-line: quotemark
import { Observable, BehaviorSubject, of, Subscription } from "rxjs";
// tslint:disable-next-line: quotemark
import { map, catchError, switchMap, finalize } from "rxjs/operators";
// tslint:disable-next-line: quotemark
import { UserModel } from "../_models/user.model";
// tslint:disable-next-line: quotemark
import { AuthModel } from "../_models/auth.model";
// tslint:disable-next-line: quotemark
import { AuthHTTPService } from "./auth-http";
// tslint:disable-next-line: quotemark
import { environment } from "src/environments/environment";
// tslint:disable-next-line: quotemark
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private isLoadingSubject: BehaviorSubject<boolean>;
  private authSessionStorageToken = `${environment.TOKEN}`;
  private authSessionStorageId = `${environment.ID}`;
  private authSessionStorageUser = `${environment.USER}`;
  private authSessionStorageMenu = `${environment.MENU}`;

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
        const result = this.setAuthFromSessionStorage(auth);
        // //console.log(auth);
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
    sessionStorage.removeItem(this.authSessionStorageToken);
    sessionStorage.removeItem(this.authSessionStorageId);
    sessionStorage.removeItem(this.authSessionStorageUser);
    sessionStorage.removeItem(this.authSessionStorageMenu);
    /* this.ngZone.run(() => {
			this.router.navigateByUrl("/auth/login");
		}); */
    this.router.navigate(["/auth/login"], {
      queryParams: {},
    });
  }
  /* this.router.navigate(["/auth/login"], {
      queryParams: {},
    }); */

  getUserByToken(): Observable<UserModel> {
    const token = this.getAuthFromSessionStorage();
    const id = this.getIdFromSessionStorage();

    if (!token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    // //console.log("paso2");
    return this.authHttpService.getUserByToken(id).pipe(
      map((user: UserModel) => {
        // //console.log("paso3", user);
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
  private setAuthFromSessionStorage(auth: AuthModel): boolean {
    const { id, token, usuario, menu } = auth;

    // store auth token/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (token) {
      sessionStorage.setItem(
        this.authSessionStorageToken,
        JSON.stringify(token)
      );
      sessionStorage.setItem(this.authSessionStorageId, JSON.stringify(id));
      sessionStorage.setItem(
        this.authSessionStorageUser,
        JSON.stringify(usuario)
      );
      sessionStorage.setItem(this.authSessionStorageMenu, JSON.stringify(menu));
      return true;
    }
    return false;
  }

  private getAuthFromSessionStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        sessionStorage.getItem(this.authSessionStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  private getIdFromSessionStorage(): AuthModel {
    try {
      const authId = JSON.parse(
        sessionStorage.getItem(this.authSessionStorageId)
      );
      return authId;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  private getUserFromSessionStorage(): AuthModel {
    try {
      const authUser = JSON.parse(
        sessionStorage.getItem(this.authSessionStorageUser)
      );
      return authUser;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  get role(): "ADMIN_ROLE" | "USER_ROLE" | "SYSTEM_ROLE" {
    const authUser = this.getUserFromSessionStorage();
    return authUser.role;
  }

  get menuAuth(): AuthModel {
    try {
      const menuUser = JSON.parse(
        sessionStorage.getItem(this.authSessionStorageMenu)
      );
      return menuUser;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
