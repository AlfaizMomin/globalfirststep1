import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminInterfaceRoutingModule } from './admin-interface-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';

@NgModule({
  declarations: [SidebarComponent, AdminInterfaceComponent],
  imports: [CommonModule, AdminInterfaceRoutingModule],
})
export class AdminInterfaceModule {}
