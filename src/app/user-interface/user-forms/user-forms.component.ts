import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AngularFirePerformance } from '@angular/fire/compat/performance';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowService } from 'src/app/window.service';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { MailService } from 'src/app/mail.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { ToastService } from 'src/app/toast.service';
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.scss'],
})
export class UserFormsComponent implements OnChanges {
  @ViewChild('closebutton') closebutton;
  @ViewChild('captchaContainer') captchaContainer!: ElementRef;
  @Input()
  category: string = '';
  mobileNumberString: string = '';
  verifyOtpString: string = '';
  winRef: any;
  // Real Estate Variable
  realEstateForm: FormGroup;
  propertyType = ['Resale', 'New Property', 'Bank Property', 'Rent'];
  //jobs
  appliedBy = 'Candidate';
  list = [
    { name: 'Candidate', value: 'candidate', checked: true },
    { name: 'Client', value: 'client', checked: false },
  ];
  expYear = ['0-2', '2-5', '5-10', '10+'];
  form: FormGroup;
  submitted = false;
  public today = new Date();
  public progressValue: Observable<number>;
  public filepath: any;
  public filename: any;
  public downloadableURL = '';
  public task: AngularFireUploadTask;

  //loan
  LoanForm: FormGroup;
  loanTypes = [
    { id: 'pl', name: 'Personal loan' },
    { id: 'hl', name: 'Home Loan' },
    { id: 'bl', name: 'Buisness Loan' },
    { id: 'lap', name: 'Loan against property(LAP)' },
  ];
  loanAppliedFor = 'pl';
  flatType = ['NATP', 'Gunthawari'];
  flatCategory = ['Builder purchase', 'Resale'];
  proffesion = ['Employeed', 'Buisness'];
  lapData = ['Residential', 'Commercial'];

  //confirm popup
  modalRef: any;
  constructor(
    public fireService: FireServiceService,
    private router: Router,
    private windowRef: WindowService,
    private mailService: MailService,
    private modalService: NgbModal,
    private toastMsg: ToastService
  ) {
    this.winRef = windowRef;
    this.form = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      resume: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile_number: new FormControl('', Validators.required),
      appliedBy: new FormControl('Candidate', Validators.required),
      experience: new FormControl('', Validators.required),
    });

    this.LoanForm = new FormGroup({
      type: new FormControl('Personal loan', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile_number: new FormControl('', Validators.required),
      income: new FormControl('', Validators.required),
      income_from: new FormControl(''),
      income_from_name: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      proffesion: new FormControl('Employeed', Validators.required),
      flat_category: new FormControl(''),
      flat_type: new FormControl(''),
    });

    this.realEstateForm = new FormGroup({
      proper_type: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile_number: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let option = ['Jobs', 'finance', 'real-estate', 'e-seva'];
    let path = changes.category.currentValue;
    this.category =
      path == null || path == ''
        ? this.router.url.split('/').slice(-1)[0]
        : path;
    if (option.indexOf(this.category) == -1) {
      this.category = 'Jobs';
    }
    this.submitted = false;
  }

  //loan
  submitLoanForm() {
    this.submitted = true;
    if (this.LoanForm.valid) {
      this.sendLoginOtp(this.LoanForm.value.mobile_number);
      this.modalRef = this.modalService.open(ConfirmPopupComponent);
      this.modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        this.verifyOtpString = receivedEntry;
        this.verifyOtp();
      });
    }
  }

  async submitLoanDetails() {
    await this.fireService.addLoanDetail(this.LoanForm.value);
    let obj = {
      from_name: this.LoanForm.value.first_name,
      to_name: 'Global First Step',
      from_email: 'imomin242@gmail.com',
      subject: `${this.LoanForm.value.type} inqury`,
      message: `You got one inqury from ${this.LoanForm.value.first_name} ${this.LoanForm.value.last_name}`,
      client_mobile_number: `Mobile number ${this.LoanForm.value.mobile_number}`,
      client_email: `Email ${this.LoanForm.value.email}`,
      see_resume: '',
    };
    this.mailService.sendMail(obj);
    this.LoanForm.reset();
    this.submitted = false;
    // window.location.reload();
  }

  // Real Estate
  submitPropertyForm() {
    this.submitted = true;
    if (this.realEstateForm.valid) {
      this.sendLoginOtp(this.realEstateForm.value.mobile_number);
      this.modalRef = this.modalService.open(ConfirmPopupComponent);
      this.modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        this.verifyOtpString = receivedEntry;
        this.verifyOtp();
      });
    }
  }

  async submitPropertyDetails() {
    await this.fireService.addPropertyDetail(this.realEstateForm.value);
    let obj = {
      from_name: this.realEstateForm.value.first_name,
      to_name: 'Global First Step',
      from_email: 'imomin242@gmail.com',
      subject: `${this.realEstateForm.value.proper_type} inqury`,
      message: `You got one inqury from ${this.realEstateForm.value.first_name} ${this.realEstateForm.value.last_name}`,
      client_mobile_number: `Mobile number ${this.realEstateForm.value.mobile_number}`,
      client_email: `Email ${this.realEstateForm.value.email}`,
      see_resume: '',
    };
    this.mailService.sendMail(obj);
    this.realEstateForm.reset();
    this.submitted = false;
    // window.location.reload();
  }

  onChange(loanType) {
    this.submitted = false;
    this.loanAppliedFor = this.loanTypes.find((x) => x.name == loanType).id;
    if (this.loanAppliedFor == 'hl') {
      this.form.addControl(
        'flat_category',
        new FormControl('', [Validators.required])
      );
      this.form.addControl(
        'flat_type',
        new FormControl('', [Validators.required])
      );
    } else {
      this.form.removeControl('flat_category');
      this.form.removeControl('flat_type');
    }
  }

  sendLoginOtp(number) {
    const auth = getAuth();
    this.winRef.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    );

    const appVerifier = this.winRef.recaptchaVerifier;
    signInWithPhoneNumber(auth, '+91' + number, appVerifier)
      .then((confirmationResult) => {
        this.winRef.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        this.modalRef.close();
        this.toastMsg.showBasicComponent(error.message);
      });
  }

  verifyOtp() {
    this.winRef.confirmationResult
      .confirm(this.verifyOtpString)
      .then((result: any) => {
        if (this.category == 'finance') {
          this.submitLoanDetails();
        }
        if (this.category == 'real-estate') {
          this.submitPropertyDetails();
        }
        this.modalRef.close();
      })
      .catch((error: any) => {
        this.modalRef.close();
        this.toastMsg.showBasicComponent(error.message);
      });
  }

  GoogleAuth() {
    this.windowRef.GoogleAuth();
  }

  sendMail() {
    let obj = {
      from_name: this.form.value.first_name,
      to_name: 'Global First Step',
      from_email: 'imomin242@gmail.com',
      subject:
        this.appliedBy == 'Candidate' ? 'Candidate inqury' : 'Client inqury',
      message: `You got one inqury from ${this.form.value.first_name} ${this.form.value.last_name}`,
      client_mobile_number: `Mobile number ${this.form.value.mobile_number}`,
      client_email: `Email ${this.form.value.email}`,
      see_resume:
        this.appliedBy == 'Candidate'
          ? `Resume :${this.form.value.resume}`
          : 'Client inqury',
    };
    this.mailService.sendMail(obj);
    this.form.reset();
  }
}
