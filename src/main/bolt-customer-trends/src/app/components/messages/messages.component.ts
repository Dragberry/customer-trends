import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message: string;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.source.subscribe(msg => {
      this.message = msg;
    });
  }

  clear(): void {
    this.message = null;
  }

}
