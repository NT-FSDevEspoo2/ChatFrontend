import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

const api = "http://localhost:3000/api/chat";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private url = "http://localhost:3001";
    private socket;

    constructor(private http: HttpClient) {
    }

    getChat(id) {
        return this.http.get(api + "/" + id);
    }

    connectToMessageStream(id) {
        this.socket = io(this.url);
        this.socket.emit("room", "chatroom-" + id);
    }

    sendMessage(id, sender, message) {
        return this.http.post(api + "/sendmessage/" + id, { sender: sender, message: message }, httpOptions);
    }

    getMessageStream = () => {
        return Observable.create((observer) => {
            this.socket.on("message", (message) => {
                observer.next(message);
            });
        });
    }
}
