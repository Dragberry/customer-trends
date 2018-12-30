import { Component, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-criteria-panel',
  templateUrl: './criteria-panel.component.html'
})
export class CriteriaPanelComponent {

  customerKey: string;
  accountNumber: string;

  customerKeyChangedDelay: any;
  accountNumbers: string[] = [];

  @Output()
  customerKeyChanged: EventEmitter<string> = new EventEmitter();


  @Output()
  submit: EventEmitter<any> = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private messageService: MessagesService) { }

  analyze(): void {
    this.submit.emit({ customerKey: this.customerKey, accountNumber: this.accountNumber});
  }

  onCustomerKeyChanged(): void {
    clearTimeout(this.customerKeyChangedDelay);
    this.customerKeyChangedDelay = setTimeout(() => {
      this.fetchAccounts();
      this.customerKeyChanged.emit(this.customerKey);
    }, 250);
    this.accountNumber = null;
  }

  fetchAccounts(): void {
    if (this.customerKey) {
      this.accountService.getCustomerAccounts(this.customerKey)
      .then(accounts => {
        this.accountNumbers = accounts;
      })
      .catch(error => {
        this.messageService.showError(error);
      });
    } else {
      this.accountNumbers = [];
    }
  }
}
