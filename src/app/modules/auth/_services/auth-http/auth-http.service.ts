import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../_models/user.model";
import { environment } from "../../../../../environments/environment";
import { AuthModel } from "../../_models/auth.model";

const API_USERS_URL = `${environment.apiUrl}/login`;

@Injectable({
  providedIn: "root",
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(documento: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(API_USERS_URL, { documento, password });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check documento => If documento exists send link to the user and return true | If documento doesn't exist return false
  forgotPassword(documento: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      documento,
    });
  }

  getUserByToken(token): Observable<UserModel> {
    console.log(token);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set("Authorization", "Bearer " + token);
    return this.http.get<UserModel>(`${environment.apiUrl}/usuario`, {
      headers: httpHeaders,
    });
  }
}
