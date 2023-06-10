import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountDetail } from '../models/AccountDetail.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  public accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 10;
  // account$!: Observable<AccountDetail> => $ observable
  accountObservable!: Observable<AccountDetail>;

  operationFromGroup!: FormGroup;
  errorMessage! :string ;
  constructor(private formBuilder: FormBuilder, private accountService: AccountsService){}
 
  ngOnInit(): void {
   this.accountFormGroup = this.formBuilder.group({
    accountId: this.formBuilder.control('', [Validators.required])
   });

   this.operationFromGroup = this.formBuilder.group({
    operationType: this.formBuilder.control(null),  
    amount: this.formBuilder.control(0),
    description: this.formBuilder.control(null),
    accountDestination: this.formBuilder.control(null)
  });
  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
    console.log(accountId);
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }


  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId :string = this.accountFormGroup.value.accountId;
    let operationType=this.operationFromGroup.value.operationType;
    let amount :number =this.operationFromGroup.value.amount;
    let description :string =this.operationFromGroup.value.description;
    let accountDestination :string =this.operationFromGroup.value.accountDestination;

    switch (operationType) {
      case 'DEBIT':
        this.accountService.debit(accountId, amount,description).subscribe({
          next : (data)=>{
            alert("Success Credit");
            this.operationFromGroup.reset();
            this.handleSearchAccount();
          },
          error : (err)=>{
            console.log(err);
          }
        });
        break;
      case 'CREDIT':
        this.accountService.credit(accountId, amount,description).subscribe({
          next : (data)=>{
            alert("Success Debit");
            this.operationFromGroup.reset();
            this.handleSearchAccount();
          },
          error : (err)=>{
            console.log(err);
          }
        });
      break;
    
      default:
        this.accountService.transfer(accountId,accountDestination, amount,description).subscribe({
          next : (data)=>{
            alert("Success Transfer");
            this.operationFromGroup.reset();
            this.handleSearchAccount();
          },
          error : (err)=>{
            console.log(err);
          }
        });
        break;
    }
  }
}
