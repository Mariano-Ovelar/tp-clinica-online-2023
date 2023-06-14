import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  showChat = false;
  messages: Array<Mensaje> = [];
  user: any=null;
  @ViewChild('messagesBox') messagesBox!: ElementRef;
  isChatVisible: boolean = false;
  newMessage: string = '';
  constructor(private chatService: ChatService, private userSrv: AuthService) {}

  ngOnInit(): void {
    this.user = this.userSrv.usuario;

    this.chatService.getMessages().subscribe((res) => {
      res.sort((a, b) => {
        let fecha1 = new Date(a.fullDate);
        let fecha2 = new Date(b.fullDate);

        if (fecha1 === fecha2) return 0;
        return fecha1 > fecha2 ? 1 : -1;
      });

      this.messages = res;

      this.scrollChat();
    });
  }
  hideChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  scrollChat() {
    setTimeout(() => {
      if (!this.messagesBox) return;
      const div = this.messagesBox.nativeElement;
      div.scrollTop = div.scrollHeight;
    }, 10);
  }

  onSubmit() {
    if (this.newMessage != '') {
      let date = new Date();
      let hora = date.toLocaleTimeString();
      let dayAndMonth = date
        .toLocaleDateString()
        .split('/')
        .slice(0, 2)
        .join('/');
      let fullDate = `${date
        .toLocaleDateString()
        .split('/')
        .reverse()
        .join('-')} ${hora}`;

      let message = {
        message: this.newMessage,
        user: this.user,
        fullDate: fullDate,
        date: dayAndMonth,
        hora: hora,
      };
      this.chatService.addMessage(message);
      this.newMessage = '';
    }
  }

  /* get message() {
    return this.formChat.controls['message'];
  } */
}
