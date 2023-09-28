import { Component, ViewChild } from '@angular/core';
import { AngularFirePerformance } from '@angular/fire/compat/performance';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-real-estate-forms',
  templateUrl: './real-estate-forms.component.html',
  styleUrls: ['./real-estate-forms.component.scss'],
})
export class RealEstateFormsComponent {
  flatCategories = ['Rent', 'Resale', 'New Property', 'Bank Property'];
  allPropertyDetail = [];
  actualJobDetail = [];
  form: FormGroup;
  submitted = false;
  showLoader = false;
  isEdit = false;
  selectedId = '';
  task: any;
  images: any = [];
  @ViewChild('closebutton') closebutton;
  constructor(
    public fireService: FireServiceService,
    public fb: FormBuilder,
    private performance: AngularFirePerformance,
    private angularFire: AngularFireStorage
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      flatCategories: ['', [Validators.required]],
      property_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      sqft: ['', [Validators.required]],
      bedroom: ['', [Validators.required]],
      bathroom: ['', [Validators.required]],
      image1: ['', [Validators.required]],
      image2: ['', [Validators.required]],
      image3: ['', [Validators.required]],
      image4: ['', [Validators.required]],
      image5: ['', [Validators.required]],
      area: ['', [Validators.required]],
      images: ['', [Validators.required]],
    });
    this.getDetails();
  }

  getDetails() {
    this.fireService
      .getPropertyDetails()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.allPropertyDetail = [];
        this.allPropertyDetail = data;
        this.actualJobDetail = this.allPropertyDetail;
        this.showLoader = false;
      });
  }

  Submit() {
    this.submitted = true;
    if (this.form.valid) {
      let data = {
        images: this.images.slice(0, 5),
        area: this.form.value.area.toLowerCase(),
        property_name: this.form.value.property_name,
        address: this.form.value.address,
        sqft: this.form.value.sqft,
        bedroom: this.form.value.bedroom,
        bathroom: this.form.value.bathroom,
        flatCategories: this.form.value.flatCategories,
      };
      this.fireService.addPropertyDetails(data);
      this.form.reset();
      this.images = [];
      this.submitted = false;
      this.isEdit = false;
      this.closebutton.nativeElement.click();
    }
  }

  openPopup() {
    this.form.reset();
  }

  searchByName(searchVal: any) {
    if (searchVal.length == 0) {
      this.allPropertyDetail = this.actualJobDetail;
    } else {
      this.allPropertyDetail = this.actualJobDetail.filter((e) =>
        e.area.toLowerCase().includes(searchVal.toLowerCase())
      );
    }
  }

  async onImageUpload(file, i) {
    const fileData = file.target.files[0];
    if (fileData) {
      let filepath = Math.random() + fileData;
      this.performance.trace('image upload performance').then((success) => {});
      this.task = this.angularFire.upload(
        `realEstateImage/${filepath}`,
        fileData
      );
      (await this.task).ref.getDownloadURL().then((url) => {
        this.images.push({ index: i, src: url, headline: 'Image' });
        this.form.get(`images`).setValue(this.images);
      });
    } else {
      alert('No image selected');
    }
  }

  deleteItem(id) {
    this.fireService.deletPropertyById(id);
  }
}
