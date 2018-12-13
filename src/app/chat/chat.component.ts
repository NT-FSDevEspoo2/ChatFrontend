import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    nickname;
    chat: any = {};

    constructor(private chatService: ChatService) { }

    ngOnInit() {
    }

    connect(chatId) {
        this.chatService.getChat(chatId).subscribe(chat => {
            this.chat = chat;

            this.chatService.connectToMessageStream(chatId);

            this.chatService.getMessageStream().subscribe((message) => {
                this.chat.messages.push(message);
            });
        });
    }

    sendMessage(message) {
        this.chatService.sendMessage(this.chat.id, this.nickname, message).subscribe(response => {

        });
    }

}
