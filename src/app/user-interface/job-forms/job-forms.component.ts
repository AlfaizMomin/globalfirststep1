import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpService } from 'src/app/otp.service';
import { ToastService } from 'src/app/toast.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { WindowService } from 'src/app/window.service';
import { FireServiceService } from 'src/app/fire-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MailService } from 'src/app/mail.service';
import { AngularFirePerformance } from '@angular/fire/compat/performance';
@Component({
  selector: 'app-job-forms',
  templateUrl: './job-forms.component.html',
  styleUrls: ['./job-forms.component.scss'],
})
export class JobFormsComponent {
  //otp
  winRef: any;
  verifyOtpString: string = '';
  modalRef: any;

  public form: FormGroup;
  unsubcribe: any;
  fields = [];
  public candidatefields: any[] = [
    {
      type: 'dropdown',
      name: 'source',
      label: 'Select Source',
      value: 'Candidate',
      required: true,
      options: [
        { key: 'Client', label: 'Client' },
        { key: 'Candidate', label: 'Candidate' },
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
      name: 'address',
      label: 'Address',
      value: '',
      required: true,
    },

    {
      type: 'file',
      name: 'resume',
      label: 'Resume',
      required: false,
      onUpload: this.onUpload.bind(this),
    },
    {
      type: 'dropdown',
      name: 'Experiance',
      label: 'Experiance',
      value: '0-2',
      required: true,
      options: [
        { key: '0-2', label: '0-2' },
        { key: '2-5', label: '2-5' },
        { key: '5-10', label: '5-10' },
        { key: '10+', label: '10+' },
      ],
    },
  ];

  public clientFields: any[] = [
    {
      type: 'dropdown',
      name: 'source',
      label: 'Select Source',
      value: 'Client',
      required: true,
      options: [
        { key: 'Client', label: 'Client' },
        { key: 'Candidate', label: 'Candidate' },
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
      name: 'requirment',
      label: 'Requirment For',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'vacany',
      label: 'Number of vacancy',
      value: '',
      required: true,
    },
    {
      type: 'dropdown',
      name: 'Experiance',
      label: 'Experiance',
      value: '0-2',
      required: true,
      options: [
        { key: '0-2', label: '0-2' },
        { key: '2-5', label: '2-5' },
        { key: '5-10', label: '5-10' },
        { key: '10+', label: '10+' },
      ],
    },
  ];

  payLoadData: any = {};
  task: any;
  filename: any;
  filepath: any;
  progressValue: any;
  downloadableURL: string;
  constructor(
    private toastMsg: ToastService,
    private optService: OtpService,
    private modalService: NgbModal,
    private windowRef: WindowService,
    private fireService: FireServiceService,
    private angularFire: AngularFireStorage,
    private mailService: MailService,
    private performance: AngularFirePerformance
  ) {
    this.winRef = windowRef;
    this.fields = this.candidatefields;
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

  onUpload(e) {}

  ngDistroy() {
    this.unsubcribe();
  }

  getValue(e) {
    if (e == 'Client') {
      this.fields = this.clientFields;
    } else if (e == 'candidate') {
      this.fields = this.candidatefields;
    }
    this.validateForm();
  }

  submit(formData: any) {
    if (formData.valid) {
      this.payLoadData = formData.value;
      this.sendLoginOtp();
    }
  }

  sendLoginOtp() {
    this.optService.sendLoginOtp(this.payLoadData.mobile);
    this.modalRef = this.modalService.open(ConfirmPopupComponent);
    this.modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.verifyOtpString = receivedEntry;
      this.verifyOtp();
    });
  }

  verifyOtp() {
    this.winRef.confirmationResult
      .confirm(this.verifyOtpString)
      .then(() => {
        this.modalRef.close();
        this.submitDetails();
      })
      .catch((error: any) => {
        this.modalRef.close();
        this.toastMsg.showBasicComponent(error.message);
      });
  }

  async submitDetails() {
    if (this.payLoadData.source == 'Client') {
      await this.fireService.addClientItem(this.payLoadData);
    } else {
      this.payLoadData.resume = this.downloadableURL;
      await this.fireService.addItem(this.payLoadData);
    }
    this.sendMail();
  }

  sendMail() {
    let obj = {
      from_name: this.payLoadData.firstName,
      to_name: 'Global First Step',
      from_email: 'imomin242@gmail.com',
      subject: `${this.payLoadData.source} inqury`,
      message: `You got one inqury from ${this.payLoadData.firstName} ${this.payLoadData.lastName}`,
      client_mobile_number: `Mobile number ${this.payLoadData.mobile}`,
      client_email: `Email ${this.payLoadData.email}`,
      see_resume: '',
    };
    this.mailService.sendMail(obj);
  }

  async onImageUpload(file) {
    const fileData = file.target.files[0];
    if (fileData) {
      this.filename = file.target.files[0].name;
      this.filepath = Math.random() + fileData;
      this.performance.trace('image upload performance').then((success) => {});
      this.task = this.angularFire.upload(`Resume/${this.filepath}`, fileData);
      this.progressValue = this.task.percentageChanges();
      (await this.task).ref.getDownloadURL().then((url) => {
        this.downloadableURL = url;
      });
    } else {
      alert('No image selected');
      this.downloadableURL = '';
    }
  }
}
