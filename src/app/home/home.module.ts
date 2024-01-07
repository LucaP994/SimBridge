import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomePageRoutingModule } from './home-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoaderComponent } from '../components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PdfViewerModule,
    MatProgressSpinnerModule
  ],
  declarations: [HomePage, LoaderComponent],

})
export class HomePageModule {}
