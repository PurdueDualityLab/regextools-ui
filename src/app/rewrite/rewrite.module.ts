import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewriteRoutingModule } from './rewrite-routing.module';
import { RewriteComponent } from './rewrite.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    RewriteComponent
  ],
  imports: [
    CommonModule,
    RewriteRoutingModule,
    ReactiveFormsModule,
    ClipboardModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
  ]
})
export class RewriteModule { }
