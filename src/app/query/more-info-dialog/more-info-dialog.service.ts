import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegexEntity } from '../regex-entity.model';
import { MoreInfoDialogComponent } from './more-info-dialog.component';

@Injectable()
export class MoreInfoDialogService {

  constructor(
    private readonly matDialog: MatDialog,
  ) { }

  openDialogForRegex(entity: RegexEntity): MatDialogRef<MoreInfoDialogComponent> {
    return this.matDialog.open(MoreInfoDialogComponent, {
      data: { entity },
      width: '60%',
      height: '80%',
    });
  }
}
