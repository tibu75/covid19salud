import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DynamicAsideMenuConfig } from "../../configs/dynamic-aside-menu.config";

const emptyMenuConfig = {
  items: [],
};

@Injectable({
  providedIn: "root",
})
export class DynamicAsideMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;
  constructor() {
    this.loadMenu();
    this.menuConfig$ = this.menuConfigSubject.asObservable();
  }

  // Here you able to load your menu from server/data-base/localStorage
  // Default => from DynamicAsideMenuConfig
  private loadMenu() {
    this.setMenu(DynamicAsideMenuConfig);
    //console.log(this.setMenu);
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
    // console.log(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
}
