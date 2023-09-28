import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { FireServiceService } from 'src/app/fire-service.service';

@Component({
  selector: 'app-real-state-details',
  templateUrl: './real-state-details.component.html',
  styleUrls: ['./real-state-details.component.scss'],
})
export class RealStateDetailsComponent {
  currentSlide = 0;
  allPropertyData = [];
  propertyData = [];
  propertyDetails = [];
  areaList = [];
  intervalSubscription: any;
  selectedIndex = 0;
  selectedParam: string = '';
  constructor(
    private route: ActivatedRoute,
    private fireService: FireServiceService
  ) {}

  ngOnInit() {
    this.selectedParam = this.route.snapshot.params.category;
    this.fireService
      .getPropertyByCategory(this.selectedParam)
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          this.allPropertyData = [];
          return;
        }

        snapshot.forEach((doc) => {
          this.allPropertyData.push(doc.data());
        });
        this.getAreaList();
      });
  }

  getAreaList() {
    this.allPropertyData.filter((el) => {
      if (this.areaList.indexOf(el.area) === -1) {
        this.areaList.push(el.area);
      }
    });
    this.propertyData = this.allPropertyData.filter((el) => {
      return el.area == this.areaList[0];
    });
  }

  getPropertyById(item, index) {
    this.selectedIndex = index;

    this.propertyData = this.allPropertyData.filter((el) => {
      return el.area == item;
    });
  }

  onSlideClick(index: number) {
    if (this.currentSlide !== index) {
      this.currentSlide = index;
    }
  }

  onPreviousClick(i) {
    const previous = this.currentSlide - 1;
    this.currentSlide =
      previous < 0 ? this.propertyData[i].images.length - 1 : previous;
  }

  onNextClick(i) {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.propertyData[i].images.length ? 0 : next;
  }
}
