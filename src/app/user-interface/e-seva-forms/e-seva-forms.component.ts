import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpService } from 'src/app/otp.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { ToastService } from 'src/app/toast.service';
import { FireServiceService } from 'src/app/fire-service.service';
import { WindowService } from 'src/app/window.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MailService } from 'src/app/mail.service';

@Component({
  selector: 'app-e-seva-forms',
  templateUrl: './e-seva-forms.component.html',
  styleUrls: ['./e-seva-forms.component.scss'],
})
export class ESevaFormsComponent {
  public panCardFields: any[] = [
    {
      type: 'dropdown',
      name: 'document_type',
      label: 'Document Type',
      value: 'pan_card',
      required: true,
      options: [
        { key: 'pan_card', label: 'Pan Card' },
        { key: 'aadhar_card', label: 'Aadhar Card' },
        { key: 'shopact_license', label: 'Shopact License' },
        { key: 'udyam_aadhar', label: 'Udyam Aadhar' },
        { key: 'passport', label: 'Passport' },
        { key: 'Driving_license', label: 'Driving License' },
        { key: 'voter_id', label: 'Voter ID' },
        { key: 'food_license', label: 'Food License' },
        { key: 'itr', label: 'ITR' },
        { key: 'gst', label: 'GST' },
      ],
    },
    {
      type: 'dropdown',
      name: 'apply_for',
      label: 'Apply For',
      value: 'new',
      required: true,
      options: [
        { key: 'new', label: 'New' },
        { key: 'old', label: 'Old' },
        { key: 'correction', label: 'Correction/Renew' },
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
      type: 'dropdown',
      name: 'priority',
      label: 'Priority',
      value: 'urgent',
      required: true,
      options: [
        { key: 'urgent', label: 'Urgent' },
        { key: 'regular', label: 'Regular' },
      ],
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
    private optService: OtpService,
    private modalService: NgbModal,
    private toastMsg: ToastService,
    private fireService: FireServiceService,
    private windowRef: WindowService,
    private mailService: MailService
  ) {
    this.fields = this.panCardFields;
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
    if (e == 'gst' || e == 'itr') {
      // this.fields = [];
      this.fields = this.panCardFields.filter((el) => {
        if (el.name == 'document_type') {
          el.value = e;
        }
        return el.name != 'apply_for';
      });
    } else if (
      e == 'pan_card' ||
      e == 'aadhar_card' ||
      e == 'shopact_license' ||
      e == 'udyam_aadhar' ||
      e == 'udyam_aadhar' ||
      e == 'passport' ||
      e == 'Driving_license' ||
      e == 'voter_id' ||
      e == 'food_license'
    ) {
      this.fields = this.panCardFields;
    }
    // this.form.reset();
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
    await this.fireService.addESevaDetails(this.payLoadData);
    this.sendMail();
  }

  sendMail() {
    let obj = {
      from_name: this.payLoadData.firstName,
      to_name: 'Global First Step',
      from_email: 'imomin242@gmail.com',
      subject: `${this.payLoadData.document_type} inqury`,
      message: `You got one inqury from ${this.payLoadData.firstName} ${this.payLoadData.lastName}`,
      client_mobile_number: `Mobile number ${this.payLoadData.mobile}`,
      client_email: `Email ${this.payLoadData.email}`,
      see_resume: '',
    };
    this.mailService.sendMail(obj);
  }
}
