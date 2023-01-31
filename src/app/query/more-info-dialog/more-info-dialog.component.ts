import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegexEntity } from '../regex-entity.model';

export interface MoreInfoDialogInput {
  entity: RegexEntity;
}

@Component({
  selector: 'app-more-info-dialog',
  templateUrl: './more-info-dialog.component.html',
  styleUrls: ['./more-info-dialog.component.scss']
})
export class MoreInfoDialogComponent implements OnInit {

  entity!: RegexEntity;

  constructor(
    private readonly matDialogRef: MatDialogRef<MoreInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly dialogInput: MoreInfoDialogInput,
  ) {
  }

  ngOnInit(): void {
    this.entity = this.dialogInput.entity;
  }
}
