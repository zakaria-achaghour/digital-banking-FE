import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/Customer.model';
import { CustomersService } from '../services/customers.service';
import { Error } from '../models/Error.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  // public customers: Array<Customer> = [];
  public customers!: Observable<Array<Customer>>;
  // errorMessage!: string; 
  // errorMessage: string | undefined; 
  errorMessage!: Error; 
  searchFormGroup : FormGroup | undefined;
  constructor(private customerService: CustomersService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // validation of inputs fielad simple with reactive form
    this.searchFormGroup = this.formBuilder.group(
      {
        keyword: this.formBuilder.control("")
      }
    );



    //   this.customerService.getCustomers().subscribe({
    //     next: data => {
    //       this.customers = data
    //   },
    //   error: err => { 
    //     console.log(err);
    //     this.errorMessage = err;
    //   }
    // })

    // this.customers = this.customerService.getCustomers().pipe(
    //   catchError(error => {
    //     this.errorMessage = error;
    //     return throwError(() => error);
    //   })
    // );

    this.handleSearchCustomer();
  }
  
  handleSearchCustomer () {
    let keyword = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(keyword).pipe(
      catchError(error => {
        this.errorMessage = error;
        return throwError(() => error);
      })
    );
  }

  handleDeleteCustomer(c :Customer) {
    let conf = confirm('are u sure ??');
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: data => {
        this.customers = this.customers.pipe(
          map(data =>  {
            let index = data.indexOf(c);
            data.splice(index, 1);
            return data;
          })
        )
      }, 
      error: err => {
        console.log(err);
      } 
    })
  }
}
