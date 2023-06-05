import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/env';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: String, page: number, size: number) {
    return this.http.get(`${environment.apiUrl}/accounts/${accountId}?page=${page}&size=${size}`)
  }
}
