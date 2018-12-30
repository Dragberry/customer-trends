import { Component, Input } from '@angular/core';
import { AccountInfo } from 'src/app/model/account-info';
import { AccountService } from 'src/app/services/account.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {

  accounts: AccountInfo[];

  constructor(
    private accountService: AccountService,
    private messageService: MessagesService) { }

  @Input()
  set customerKey(customerKey: string) {
    if (customerKey) {
      this.accountService.getCustomerAccountsInfo(customerKey)
      .then(result => {
        this.accounts = result;
      }).catch(error => this.messageService.showError(error));
    } else {
      this.accounts = [];
    }
  }
}
