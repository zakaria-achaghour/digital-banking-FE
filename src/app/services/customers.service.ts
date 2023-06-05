import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }
  public getCustomers(page:number=1, size: number=4): Observable<Array<Customer>>{
    // return this.http.get<Array<Customer>>(`http://localhost:8085/customers?_page=${page}&_limit=${size}`);
    return this.http.get<Array<Customer>>(`${environment.apiUrl}/customers`);
  }


  public deleteCustomer(id: String) {
    return this.http.delete<any>(`${environment.apiUrl}/customers/${id}`);
  }
 
  public saveCustomer(Customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(`${environment.apiUrl}/customers`, Customer);
  }

  public searchCustomers(keyword: String): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(`${environment.apiUrl}/customers/search?keyword=${keyword}`);
  }
}
