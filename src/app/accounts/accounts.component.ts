import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  public accountFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder){}
  ngOnInit(): void {
   this.accountFormGroup = this.formBuilder.group({
    accountId: this.formBuilder.control('', [Validators.required])
   })
  }

  handleSearchAccount() {
    
  }
}
