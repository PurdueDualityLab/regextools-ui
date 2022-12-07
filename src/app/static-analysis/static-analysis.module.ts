import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticAnalysisRoutingModule } from './static-analysis-routing.module';
import { StaticAnalysisComponent } from './static-analysis.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    StaticAnalysisComponent
  ],
  imports: [
    CommonModule,
    StaticAnalysisRoutingModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ]
})
export class StaticAnalysisModule { }
