import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpService } from 'src/app/otp.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { ToastService } from 'src/app/toast.service';
import { FireServiceService } from 'src/app/fire-service.service';
import { WindowService } from 'src/app/window.service';
import { MailService } from 'src/app/mail.service';

@Component({
  selector: 'app-loan-forms',
  templateUrl: './loan-forms.component.html',
  styleUrls: ['./loan-forms.component.scss'],
})
export class LoanFormsComponent {
  public personalLoanFields: any[] = [
    {
      type: 'dropdown',
      name: 'loan_type',
      label: 'Loan Type',
      value: 'personal_loan',
      required: true,
      options: [
        { key: 'personal_loan', label: 'Personal Loan' },
        { key: 'home_loan', label: 'Home loan' },
        { key: 'business_loan', label: 'Business loan' },
        { key: 'lap', label: 'LAP' },
        { key: 'private_finance', label: 'Private Finance' },
      ],
    },

    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile Number',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'company_name',
      label: 'Company Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'location',
      label: 'Location',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'income',
      label: 'Anual Income',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'experience',
      label: 'Company Experience/ Buisiness Experience',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'required_amount',
      label: 'Required Amount',
      value: '',
      required: true,
    },
  ];

  public homeLoanFields: any[] = [
    {
      type: 'dropdown',
      name: 'loan_type',
      label: 'Loan Type',
      value: 'home_loan',
      required: true,
      options: [
        { key: 'personal_loan', label: 'Personal Loan' },
        { key: 'home_loan', label: 'Home loan' },
        { key: 'business_loan', label: 'Business loan' },
        { key: 'lap', label: 'LAP' },
        { key: 'private_finance', label: 'Private Finance' },
      ],
    },

    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile Number',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'company_name',
      label: 'Company Name/Business Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'location',
      label: 'Location',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'income',
      label: 'Anual Income',
      value: '',
      required: true,
    },
    {
      type: 'dropdown',
      name: 'flat_type',
      label: 'Flat Type',
      value: 'natp',
      required: true,
      options: [
        { key: 'natp', label: 'NATP' },
        { key: 'gunthewari', label: 'Gunthewari' },
      ],
    },
    {
      type: 'dropdown',
      name: 'purchase',
      label: 'Purchase',
      value: 'builder_purchase',
      required: true,
      options: [
        { key: 'builder_purchase', label: 'Builder Purchase' },
        { key: 'resale', label: 'Resale' },
      ],
    },
    {
      type: 'dropdown',
      name: 'income_source',
      label: 'Income Source',
      value: 'employed',
      required: true,
      options: [
        { key: 'employed', label: 'Employed' },
        { key: 'buisiness', label: 'Buisiness' },
      ],
    },
    {
      type: 'text',
      name: 'required_amount',
      label: 'Required Amount',
      value: '',
      required: true,
    },
  ];

  public buisinessLoanFields: any[] = [
    {
      type: 'dropdown',
      name: 'loan_type',
      label: 'Loan Type',
      value: 'business_loan',
      required: true,
      options: [
        { key: 'personal_loan', label: 'Personal Loan' },
        { key: 'home_loan', label: 'Home loan' },
        { key: 'business_loan', label: 'Business loan' },
        { key: 'lap', label: 'LAP' },
        { key: 'private_finance', label: 'Private Finance' },
      ],
    },

    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile Number',
      value: '',
      required: true,
    },

    {
      type: 'text',
      name: 'location',
      label: 'Location',
      value: '',
      required: true,
    },

    {
      type: 'text',
      name: 'business',
      label: 'Buisiness',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'income',
      label: 'Income',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'required_amount',
      label: 'Required Amount',
      value: '',
      required: true,
    },
  ];
  public lapFields: any[] = [
    {
      type: 'dropdown',
      name: 'loan_type',
      label: 'Loan Type',
      value: 'lap',
      required: true,
      options: [
        { key: 'personal_loan', label: 'Personal Loan' },
        { key: 'home_loan', label: 'Home loan' },
        { key: 'business_loan', label: 'Business loan' },
        { key: 'lap', label: 'LAP' },
        { key: 'private_finance', label: 'Private Finance' },
      ],
    },

    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile Number',
      value: '',
      required: true,
    },

    {
      type: 'text',
      name: 'location',
      label: 'Location',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'income',
      label: 'Anual Income',
      value: '',
      required: true,
    },
    {
      type: 'dropdown',
      name: 'flat_type',
      label: 'Flat Type',
      value: 'natp',
      required: true,
      options: [
        { key: 'natp', label: 'NATP' },
        { key: 'gunthewari', label: 'Gunthewari' },
      ],
    },
    {
      type: 'dropdown',
      name: 'proerty_type',
      label: 'Property Type',
      value: 'residential',
      required: true,
      options: [
        { key: 'residential', label: 'Residential' },
        { key: 'commercial', label: 'commercial' },
      ],
    },
    {
      type: 'text',
      name: 'required_amount',
      label: 'Required Amount',
      value: '',
      required: true,
    },
  ];
  public privateFinanceFields: any[] = [
    {
      type: 'dropdown',
      name: 'loan_type',
      label: 'Loan Type',
      value: 'private_finance',
      required: true,
      options: [
        { key: 'personal_loan', label: 'Personal Loan' },
        { key: 'home_loan', label: 'Home loan' },
        { key: 'business_loan', label: 'Business loan' },
        { key: 'lap', label: 'LAP' },
        { key: 'private_finance', label: 'Private Finance' },
      ],
    },

    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile Number',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'location',
      label: 'Location',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'cibil_score',
      label: 'Cibil Score',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'required_amount',
      label: 'Required Amount',
      value: '',
      required: true,
    },
  ];

  fields = [];
  payLoadData: any = {};
  modalRef: any;
  verifyOtpString: string = '';
  winRef: any;
  public form: FormGroup;
  unsubcribe: any;

  constructor(
    private otpService: OtpService,
    private modalService: NgbModal,
    private toastMsg: ToastService,
    private fireService: FireServiceService,
    private windowRef: WindowService,
    private mailService: MailService
  ) {
    this.fields = this.personalLoanFields;
    this.winRef = windowRef;
    this.validateForm();
  }

  validateForm() {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      this.fields = JSON.parse(update.fields);
    });
  }

  getValue(e) {
    if (e == 'home_loan') {
      this.fields = this.homeLoanFields;
    } else if (e == 'business_loan') {
      this.fields = this.buisinessLoanFields;
    } else if (e == 'lap') {
      this.fields = this.lapFields;
    } else if (e == 'private_finance') {
      this.fields = this.privateFinanceFields;
    } else if (e == 'personal_loan') {
      this.fields = this.personalLoanFields;
    }

    if (this.homeLoanFields[0].options.some((el) => el.key === e)) {
      this.validateForm();
    }
  }

  submit(formData: any) {
    if (formData.valid) {
      this.payLoadData = formData.value;
      this.sendLoginOtp();
    }
  }

  sendLoginOtp() {
    this.otpService.sendLoginOtp(this.payLoadData.mobile);
    this.modalRef = this.modalService.open(ConfirmPopupComponent);
    this.modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.verifyOtpString = receivedEntry;
      this.verifyOtp();
    });
  }

  verifyOtp() {
    this.winRef.confirmationResult
      .confirm(this.verifyOtpString)
      .then((result: any) => {
        this.modalRef.close();
        this.submitDetails();
      })
      .catch((error: any) => {
        this.modalRef.close();
        this.toastMsg.showBasicComponent(error.message);
      });
  }

  async submitDetails() {
    await this.fireService.addLoanDetail(this.payLoadData);
    this.sendMail();
  }

  sendMail() {
    let obj = {
      from_name: this.payLoadData.firstName,
      to_name: 'Global First Step',
      from_email: 'imomin242@gmail.com',
      subject: `${this.payLoadData.loan_type} inqury`,
      message: `You got one inqury from ${this.payLoadData.firstName} ${this.payLoadData.lastName}`,
      client_mobile_number: `Mobile number ${this.payLoadData.mobile}`,
      client_email: `Email ${this.payLoadData.email}`,
      see_resume: '',
    };
    this.mailService.sendMail(obj);
  }
}
