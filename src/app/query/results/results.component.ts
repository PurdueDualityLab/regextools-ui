import { Component, ContentChild, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResultsStoreService } from '../results-store.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  @ViewChild('diffModeInfo', {static: true})
  diffModeInfo!: TemplateRef<any>;

  results$ = this.resultsStore.results$;
  added$ = this.resultsStore.added$;
  removed$ = this.resultsStore.removed$;
  same$ = this.resultsStore.same$;
  resultCount$ = this.resultsStore.resultCount$;
  hasResults$ = this.resultsStore.hasResults$;

  useDiffMode = new FormControl(false);

  enableSections = new FormGroup({
    new: new FormControl(true),
    removed: new FormControl(true),
    same: new FormControl(true)
  });

  get showNew(): boolean {
    return this.enableSections.get('new')?.value ?? false
  }

  get showRemoved(): boolean {
    return this.enableSections.get('removed')?.value ?? false
  }

  get showSame(): boolean {
    return this.enableSections.get('same')?.value ?? false
  }

  constructor(
    private readonly resultsStore: ResultsStoreService,
    private readonly matDialog: MatDialog,
  ) { }

  openDiffModeHelp() {
    this.matDialog.open(this.diffModeInfo);
  }

  resetResults() {
    this.resultsStore.clear();
  }
}
