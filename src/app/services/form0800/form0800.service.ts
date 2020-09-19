import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Form0800 } from "../../interfaces/form0800Interface";
import { Form0800Model } from "../../pages/models/form0800covid";
import { Router } from "@angular/router";
import { AuthService } from "../../modules/auth/_services/auth.service";
import { Observable } from "rxjs";
import { Form } from "@angular/forms";

const API_USERS_URL = `${environment.apiUrl}/form`;

@Injectable({
	providedIn: "root",
})
export class Form0800Service {
	static getForms(params: any) {
		throw new Error("Method not implemented.");
	}

	form0800: Form0800Model;

	constructor(
		private http: HttpClient,
		public router: Router,
		public authService: AuthService
	) {}

	get token(): string {
		return sessionStorage.getItem("token") || "";
	}

	get headers() {
		return {
			headers: {
				Authorization: `${this.token}`,
			},
		};
	}

	getForms(): Observable<any> {
		console.log("token", this.headers);
		return this.http.get<Form0800>(API_USERS_URL, this.headers);
	}

	/* crearForm(formData: Form0800) {
		let url = API_USERS_URL + this.authService.getUserByToken();
		return this.http.post(url, formData);
	} */
}
