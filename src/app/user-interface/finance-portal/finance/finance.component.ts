import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent {
  category = [
    { name: 'Personal Loan', desc: 'Saving and Investing' },
    { name: 'Buissiness Loan', desc: 'Financial Risk Management' },
    { name: 'Home Loan', desc: ' Your Home Finance Journey' },
    { name: 'LAP', desc: '  Your Key to Financial Flexibility' },
  ];
  submitted: boolean = false;
  jobDetails: any;
  crudApi: any;
  financeForm: FormGroup;
  constructor() {
    this.financeForm = new FormGroup({
      loanType: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      // buissinessType: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      // income: new FormControl('', [Validators.required]),
    });
  }
  submit() {
    this.submitted = true;
  }
}
