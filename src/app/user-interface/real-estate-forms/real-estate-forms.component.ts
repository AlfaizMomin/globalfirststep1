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
  selector: 'app-real-estate-forms',
  templateUrl: './real-estate-forms.component.html',
  styleUrls: ['./real-estate-forms.component.scss'],
})
export class RealEstateFormsComponent {
  //otp
  winRef: any;
  verifyOtpString: string = '';
  modalRef: any;

  public resaleFields: any[] = [
    {
      type: 'dropdown',
      name: 'purchase_type',
      label: 'Purchase Type',
      value: 'resale',
      required: true,
      options: [
        { key: 'resale', label: 'Resale' },
        { key: 'new_property', label: 'New Property' },
        { key: 'bank_property', label: 'Bank Property' },
        { key: 'rent', label: 'Rent' },
        { key: 'joint_venture', label: 'Joint Venture' },
        { key: 'plot', label: 'Plot' },
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
      name: 'budget',
      label: 'Budget',
      value: '',
      required: true,
    },
  ];

  public jointVentureFields: any[] = [
    {
      type: 'dropdown',
      name: 'purchase_type',
      label: 'Purchase Type',
      value: 'joint_venture',
      required: true,
      options: [
        { key: 'resale', label: 'Resale' },
        { key: 'new_property', label: 'New Property' },
        { key: 'bank_property', label: 'Bank Property' },
        { key: 'rent', label: 'Rent' },
        { key: 'joint_venture', label: 'Joint Venture' },
        { key: 'plot', label: 'Plot' },
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
      name: 'depositeAmountFromVendor',
      label: 'Deposite Amount From Vendor',
      value: '',
      required: true,
    },
    {
      type: 'dropdown',
      name: 'title',
      label: 'Title',
      value: 'clear',
      required: true,
      options: [
        { key: 'clear', label: 'Clear' },
        { key: 'litigation', label: 'Litigation' },
      ],
    },
    {
      type: 'text',
      name: 'plot_size',
      label: 'Plot Size',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'number_of_owners',
      label: 'Number Of Owners',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'plot_type',
      label: 'Plot Type',
      value: '',
      required: true,
    },
  ];

  public plotFields: any[] = [
    {
      type: 'dropdown',
      name: 'purchase_type',
      label: 'Purchase Type',
      value: 'plot',
      required: true,
      options: [
        { key: 'resale', label: 'Resale' },
        { key: 'new_property', label: 'New Property' },
        { key: 'bank_property', label: 'Bank Property' },
        { key: 'rent', label: 'Rent' },
        { key: 'joint_venture', label: 'Joint Venture' },
        { key: 'plot', label: 'Plot' },
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
      name: 'budget',
      label: 'Budget',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'sq_ft_area',
      label: 'Sq Ft Area',
      value: '',
      required: true,
    },
    {
      type: 'dropdown',
      name: 'looking_for',
      label: 'Looking For',
      value: 'residential',
      required: true,
      options: [
        { key: 'residential', label: 'Residential' },
        { key: 'commercial', label: 'Commercial' },
      ],
    },
  ];
  payLoadData: any = {};
  fields = [];
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
    this.winRef = windowRef;
    this.fields = this.resaleFields;
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
    if (
      e == 'resale' ||
      e == 'new_property' ||
      e == 'bank_property' ||
      e == 'rent'
    ) {
      this.resaleFields[0].value = e;
      this.fields = this.resaleFields;
    } else if (e == 'joint_venture') {
      this.fields = this.jointVentureFields;
    } else if (e == 'plot') {
      this.fields = this.plotFields;
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
    await this.fireService.addPropertyDetail(this.payLoadData);
    this.sendMail();
  }

  sendMail() {
    let obj = {
      from_name: this.payLoadData.firstName,
      to_name: 'Global First Step',
      from_email: 'imomin242@gmail.com',
      subject: `${this.payLoadData.purchase_type} inqury`,
      message: `You got one inqury from ${this.payLoadData.firstName} ${this.payLoadData.lastName}`,
      client_mobile_number: `Mobile number ${this.payLoadData.mobile}`,
      client_email: `Email ${this.payLoadData.email}`,
      see_resume: '',
    };
    this.mailService.sendMail(obj);
  }
}
