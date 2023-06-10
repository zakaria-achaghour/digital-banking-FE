import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
import { AccountDetail } from '../models/AccountDetail.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: String, page: number, size: number): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(`${environment.apiUrl}/accounts/${accountId}/pageOperations?page=${page}&size=${size}`)
  }

  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(`${environment.apiUrl}/accounts/debit`,data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(`${environment.apiUrl}/accounts/credit`,data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(`${environment.apiUrl}/accounts/transfer`,data);
  }
}
