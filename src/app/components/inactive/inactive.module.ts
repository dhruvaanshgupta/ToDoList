import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InactiveRoutingModule } from './inactive-routing.module';
import { InactiveComponent } from './inactive.component';

@NgModule({
  declarations: [InactiveComponent],
  imports: [CommonModule, InactiveRoutingModule],
})
export class InactiveModule {}
console.log('Inactive loaded');
