import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './query.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { QueryListItemComponent } from './sidebar/query-list-item/query-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { QueryStoreService } from './query-store.service';
import { ResultsStoreService } from './results-store.service';
import { ResultsComponent } from './results/results.component';
import { ResultItemComponent } from './results/result-item/result-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QueryService } from './query.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MoreInfoDialogComponent } from './more-info-dialog/more-info-dialog.component';

const MAT_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatCardModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatChipsModule,
  MatDialogModule,
];

const CDK_MODULES = [
  ClipboardModule,
];

@NgModule({
  declarations: [
    QueryComponent,
    SidebarComponent,
    QueryListItemComponent,
    ResultsComponent,
    ResultItemComponent,
    MoreInfoDialogComponent
  ],
  imports: [
    CommonModule,
    QueryRoutingModule,
    ReactiveFormsModule,

    ...MAT_MODULES,
    ...CDK_MODULES,
  ],
  providers: [
    QueryStoreService,
    ResultsStoreService,
    QueryService,
  ]
})
export class QueryModule { }
