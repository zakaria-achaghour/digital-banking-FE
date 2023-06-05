import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../models/Customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  customerForm!: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name : this.formBuilder.control(null, [Validators.required, Validators.minLength(1)]),
      email : this.formBuilder.control(null, [Validators.required, Validators.email]),
      birthDate: this.formBuilder.control(null, [Validators.required])
    })
  }

  
  handleSaveCustomer() {
    let customer: Customer = this.customerForm.value;
    // alert(JSON.stringify(customer));
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        alert(JSON.stringify(data));
        this.customerForm.reset();
        this.router.navigateByUrl('/customers')
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
