import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  mobile: boolean = false;
  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  sidebarOption: any = [
    {
      path: 'client-detail',
      title: 'Client details',
      class: '',
    },
    {
      path: 'candidate-detail',
      title: 'Candidate details',
      class: '',
    },
    {
      path: 'Finance',
      title: 'Finance',
      class: '',
    },
    {
      path: 'Real-Estate',
      title: 'Real-Estate',
      class: '',
    },
    {
      path: 'E-Seva-Kendra',
      title: 'E-Seva-Kendra',
      class: '',
    },
    {
      path: 'job-form',
      title: 'Job Details',
      class: '',
    },

    {
      path: 'job-type',
      title: 'Job Category',
      class: '',
    },

    {
      path: 'real-estate-forms',
      title: 'Real Estate Forms',
      class: '',
    },
  ];

  constructor() {
    if (window.screen.width === 100) {
      this.mobile = true;
    }
  }

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }
}
