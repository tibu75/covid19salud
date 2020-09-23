import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../../../../../core";
import { Observable } from "rxjs";
import { UserModel } from "../../../../../../modules/auth/_models/user.model";
import { AuthService } from "../../../../../../modules/auth/_services/auth.service";

@Component({
	selector: "app-user-offcanvas",
	templateUrl: "./user-offcanvas.component.html",
	styleUrls: ["./user-offcanvas.component.scss"],
})
export class UserOffcanvasComponent implements OnInit {
	extrasUserOffcanvasDirection = "offcanvas-right";
	user$: Observable<UserModel>;
	public usuarios: any = {};

	constructor(private layout: LayoutService, private auth: AuthService) {}

	ngOnInit(): void {
		this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
			"extras.user.offcanvas.direction"
		)}`;
		this.user$ = this.auth.currentUserSubject.asObservable();
		this.usuarios = JSON.parse(sessionStorage.getItem("USER"));
		console.log("usuarios", this.usuarios);
	}

	logout() {
		this.auth.logout();
		document.location.reload();
	}
}
