import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap, take } from 'rxjs';
import { CoverageInfo, CoverageService } from '../coverage.service';
import { QueryStoreService } from '../query-store.service';
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
  coverage: CoverageInfo | null = null;

  constructor(
    private readonly matDialogRef: MatDialogRef<MoreInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly dialogInput: MoreInfoDialogInput,
    private readonly queryStoreService: QueryStoreService,
    private readonly coverageService: CoverageService,
  ) {
  }

  get coveragePercents(): CoverageInfo | null {
    if (this.coverage == null) {
      return null;
    }

    return {
      total: Math.max(this.coverage.total * 100, 1),
      positive: Math.max(this.coverage.positive * 100, 1),
      negative: Math.max(this.coverage.negative * 100, 1)
    };
  }

  ngOnInit(): void {
    this.entity = this.dialogInput.entity;
    this.queryStoreService.query$
      .pipe(
        take(1),
        switchMap(query => this.coverageService.computeRegexCoverage(this.entity.pattern, query.positive, query.negative))
      )
      .subscribe(response => this.coverage = response);
  }
}
