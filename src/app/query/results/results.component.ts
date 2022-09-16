import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ResultsStoreService } from '../results-store.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  // results$ = this.resultsStore.results$;
  added$ = this.resultsStore.added$;
  removed$ = this.resultsStore.removed$;
  same$ = this.resultsStore.same$;
  hasResults$ = this.resultsStore.results$.pipe(map(results => results.length > 0));

  constructor(
    private readonly resultsStore: ResultsStoreService,
  ) { }

  ngOnInit(): void {
  }
}
