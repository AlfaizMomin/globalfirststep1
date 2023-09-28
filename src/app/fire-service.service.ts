import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ToastService } from './toast.service';

interface DataRef {
  id?: String;
  first_name: String;
  last_name: String;
  address: String;
  resume: String;
  email: String;
  mobile_number: Number;
  appliedBy: String;
  experience: String;
}
interface ClientDataRef {
  id?: String;
  first_name: String;
  last_name: String;
  address: String;
  resume: String;
  email: String;
  mobile_number: Number;
  appliedBy: String;
  company_name: string;
}

interface LoanDataRef {
  id?: String;
  type: string;
  first_name: String;
  last_name: String;
  address: String;
  income: any;
  email: String;
  mobile_number: Number;
  income_from: String;
  income_from_name: string;
  experience: string;
  proffesion: string;
  flat_category: string;
  flat_type: string;
}

interface JobDetailDataRef {
  id?: String;
  $key?: string;
  job_category: string;
  vacancy: BigInteger;
  location: string;
  description: string;
}

interface realEstateDataRef {
  id?: String;
  first_name: String;
  last_name: String;
  address: String;
  email: String;
  mobile_number: Number;
  proper_type: string;
}

interface jobCategory {
  $key?: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FireServiceService {
  candidateDetailsRef: AngularFirestoreCollection<DataRef> = null;
  clientDetailsRef: AngularFirestoreCollection<ClientDataRef> = null;
  jobCategoryRef: AngularFirestoreCollection<jobCategory> = null;
  jobDetailsRef: AngularFirestoreCollection<JobDetailDataRef> = null;
  realEstateDataRef: AngularFirestoreCollection<realEstateDataRef> = null;
  eSevaDataRef: AngularFirestoreCollection<any> = null;
  propertyDetailsDataRef: AngularFirestoreCollection<any> = null;

  //loan
  LoanDataRef: AngularFirestoreCollection<DataRef> = null;
  //candidate details
  dbPath = '/candidate_details';
  //client details
  clientDbPath = '/client_details';
  //job category
  jobCategoryDbPath = '/job_category';
  //job details
  jobDetailsDbPath = '/job_details';
  //real estate
  realEstateDbPath = '/real_estate_details';
  //loan path
  loanDetailsDbPath = '/loan_details';
  //e-seva path
  eSevaDetailsDbPath = '/eseva_details';
  //propert details
  propertyDetailsDbPath = '/property_details';

  constructor(
    public fireStre: AngularFirestore,
    private toastService: ToastService
  ) {
    this.candidateDetailsRef = this.fireStre.collection(this.dbPath);
    this.clientDetailsRef = this.fireStre.collection(this.clientDbPath);
    this.jobCategoryRef = this.fireStre.collection(this.jobCategoryDbPath);
    this.jobDetailsRef = this.fireStre.collection(this.jobDetailsDbPath);
    this.LoanDataRef = this.fireStre.collection(this.loanDetailsDbPath);
    this.realEstateDataRef = this.fireStre.collection(this.realEstateDbPath);
    this.eSevaDataRef = this.fireStre.collection(this.eSevaDetailsDbPath);
    this.propertyDetailsDataRef = this.fireStre.collection(
      this.propertyDetailsDbPath
    );
  }

  //candidate
  addItem(data: any) {
    return this.fireStre
      .collection('/candidate_details')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch(() => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }
  //client
  addClientItem(data: any) {
    return this.fireStre
      .collection('/client_details')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //job category
  addJobCategoryItem(data: any) {
    return this.fireStre
      .collection('/job_category')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //job category
  addJobDetailsItem(data: any) {
    return this.fireStre
      .collection('/job_details')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //loan add
  addLoanDetail(data: any) {
    return this.fireStre
      .collection('/loan_details')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //loan real estate
  addPropertyDetail(data: any) {
    return this.fireStre
      .collection('/real_estate_details')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  // e-Seva
  addESevaDetails(data: any) {
    return this.fireStre
      .collection('/eseva_details')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  // propert Details
  addPropertyDetails(data: any) {
    return this.fireStre
      .collection('/property_details')
      .add(data)
      .then(() => {
        this.toastService.showBasicComponent(
          'Your form submitted successfully'
        );
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //  getcandidate
  getItem() {
    return this.candidateDetailsRef;
  }

  //  get client
  getClientItem() {
    return this.clientDetailsRef;
  }

  //  get job category
  getJobCategoryItem() {
    return this.jobCategoryRef;
  }

  //  get job details
  getJobDetailsItem() {
    return this.jobDetailsRef;
  }

  //get loan details
  getLoanDetailsItem() {
    return this.LoanDataRef;
  }

  //get loan details
  getPropertyDetailsItem() {
    return this.realEstateDataRef;
  }

  //get e Seva
  geteSevaDetailsItem() {
    return this.eSevaDataRef;
  }

  //get property details
  getPropertyDetails() {
    return this.propertyDetailsDataRef;
  }

  //get property details
  getPropertyByCategory(param) {
    var docRef = this.fireStre.collection('property_details').ref;
    return docRef.where('flatCategories', '==', param).get();
  }

  //delete job category
  deleteJobCategoryById(id) {
    const leadDoc = this.fireStre.doc(`job_category/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //delete client details
  deleteClientDetailById(id) {
    const leadDoc = this.fireStre.doc(`client_details/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //delete candidate details
  deleteCandidateById(id) {
    const leadDoc = this.fireStre.doc(`candidate_details/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //delete Finance Data
  deleteFinanceDataById(id) {
    const leadDoc = this.fireStre.doc(`loan_details/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //delete Job details
  deleteJobDetailsById(id) {
    const leadDoc = this.fireStre.doc(`job_details/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //delete real estate
  deletePropertyById(id) {
    const leadDoc = this.fireStre.doc(`real_estate_details/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //delete e Seva
  deleteESevaById(id) {
    const leadDoc = this.fireStre.doc(`eseva_details/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //delete property Details
  deletPropertyById(id) {
    const leadDoc = this.fireStre.doc(`property_details/${id}`);
    leadDoc
      .delete()
      .then(() => {
        this.toastService.showBasicComponent('Data deleted successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  searchByname(val) {
    var docRef = this.fireStre.collection('job_details').ref;
    return docRef.where('job_category', '==', val).get();
  }

  //update job category
  updateJobCategory(id, obj) {
    const tutorialsRef = this.fireStre.collection('job_category');
    tutorialsRef
      .doc(id)
      .set(obj)
      .then((res) => {
        this.toastService.showBasicComponent('Data updated successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }

  //update job details
  updateJobDetails(id, obj) {
    const tutorialsRef = this.fireStre.collection('job_details');
    tutorialsRef
      .doc(id)
      .set(obj)
      .then((res) => {
        this.toastService.showBasicComponent('Data updated successfully');
      })
      .catch((err) => {
        this.toastService.showBasicComponent('something went wrong');
      });
  }
}
