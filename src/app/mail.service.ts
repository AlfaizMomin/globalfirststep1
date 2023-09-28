import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor() {}

  //send mail
  sendMail(data: any) {
    emailjs.init(environment.emailConfig.privateKey);
    emailjs
      .send(
        environment.emailConfig.serviceKey,
        environment.emailConfig.templatekey,
        {
          from_name: data.first_name,
          to_name: data.to_name,
          from_email: data.from_email,
          subject: data.subject,
          message: data.message,
          client_mobile_number: data.client_mobile_number,
          client_email: data.client_email,
          see_resume: data.see_resume,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
