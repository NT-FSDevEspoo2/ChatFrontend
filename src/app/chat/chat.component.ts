import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    nickname;
    chat: any = {};
    chatRoomConnectionError = null;
    createdChat = null;
    invalidNickname = false;

    @ViewChild("chatbox") private chatbox: ElementRef;

    constructor(private chatService: ChatService) { }

    ngOnInit() {
    }

    connect(chatId) {
        this.invalidNickname = false;

        if (!this.nickname || this.nickname.trim().length === 0) {
            this.chatRoomConnectionError = "Please enter a nickname";

            this.invalidNickname = true;
            return;
        }

        this.chatService.getChat(chatId).subscribe(chat => {
            this.chat = chat;

            this.chatService.connectToMessageStream(chatId);

            this.chatService.getMessageStream().subscribe((message) => {
                this.chat.messages.push(message);

                setTimeout(() => { this.scrollToBottom() }, 100);
            })

            this.chatRoomConnectionError = null;
        }, (error) => {
            this.chatRoomConnectionError = error.error.message;
        });
    }

    sendMessage(message) {
        this.chatService.sendMessage(this.chat.id, this.nickname, message).subscribe(response => {

        });
    }

    createChat(name) {
        this.chatService.createChat(name).subscribe(chat => {
            this.createdChat = chat;
        });
    }

    scrollToBottom(): void {
        try {
            this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
        } catch (err) { }
    }
}
