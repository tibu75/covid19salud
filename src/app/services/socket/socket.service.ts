import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  socket: any;

  constructor() {
    this.socket = io("https://0800covid.ciudadanianqn.gob.ar:3221");
    //http://10.1.142.117:3221
  }

  listen(Eventname: string) {
    return new Observable((subscriber) => {
      this.socket.on(Eventname, (data) => {
        subscriber.next(data);
      });
    });
  }
}
