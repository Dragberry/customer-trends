import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountInfo } from '../model/account-info';

const ACCOUNTS_URL = 'accounts';
const ACCOUNTS_INFO_URL = `${ACCOUNTS_URL}/info`;
const ACCOUNTS_CURRENCIES_URL = `${ACCOUNTS_URL}/currencies`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getCustomerAccounts(customerKey: string): Promise<string[]> {
    return this.http.get<string[]>(ACCOUNTS_URL, { params: new HttpParams().append('customerKey', customerKey) }).toPromise();
  }

  getCustomerAccountsInfo(customerKey: string): Promise<AccountInfo[]> {
    return this.http.get<AccountInfo[]>(ACCOUNTS_INFO_URL, { params: new HttpParams().append('customerKey', customerKey) }).toPromise();
  }

  getCustomerCurrencies(customerKey: string): Promise<string[]> {
    return this.http.get<string[]>(ACCOUNTS_CURRENCIES_URL, { params: new HttpParams().append('customerKey', customerKey) }).toPromise();
  }
}
