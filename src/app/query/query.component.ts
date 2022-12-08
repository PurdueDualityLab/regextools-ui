import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResultsStoreService } from './results-store.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit, OnDestroy {

  ngDestroy$ = new Subject<void>();

  constructor(
    private readonly resultsStore: ResultsStoreService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(queryParams => {
        if (queryParams.has('participantId') && queryParams.has('taskId')) {
          this.resultsStore.setTrackingInfo({ participantId: queryParams.get('participantId')!, taskId: +(queryParams.get('taskId')!) });
        }
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
