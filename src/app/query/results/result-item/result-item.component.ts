import { animate, state, style, transition, trigger } from '@angular/animations';
import { Clipboard as CdkClipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, forkJoin, map, Observable } from 'rxjs';
import { QueryStoreService } from '../../query-store.service';
import { ResultState } from '../../results-store.service';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
  animations: [
    trigger("expansion", [
      state("closed", style({
      })),
      state("expanded", style({
        height: '400px',
      })),
      transition('closed <=> expanded', [
        animate('.5s')
      ]),
    ])
  ]
})
export class ResultItemComponent implements OnInit {

  @Input() regex = '';
  @Input() mode: ResultState = 'same';
  isExpanded = false;

  borderStyling = {
    'results-item__added-border': this.mode === 'added',
    'results-item__removed-border': this.mode === 'removed',
  };

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly clipboard: CdkClipboard,
    private readonly queryStore: QueryStoreService,
  ) { }

  ngOnInit(): void {
  }

  showComingSoon() {
    this.snackBar.open('Feature coming soon!', 'DISMISS', { duration: 3000 });
  }

  createRegex101Url$(): Observable<string> {
    // First, join all of the query strings by newlines
    return combineLatest([this.queryStore.positive$, this.queryStore.negative$])
      .pipe(
        map(([positive, negative]) => {
          const positiveBlock = positive.join('\n');
          const negativeBlock = negative.join('\n');

          const allText = [positiveBlock, negativeBlock].join('\n');

          const encodedRegex = encodeURIComponent(this.regex);
          const encodedText = encodeURIComponent(allText);

          return `https://regex101.com/?regex=${encodedRegex}&testString=${encodedText}`;
        })
      );
  }

  setToClipboard() {
    const good = this.clipboard.copy(this.regex);
    if (good) {
      this.snackBar.open('Regex coped to clipboard', 'DISMISS', { duration: 3000 });
    } else {
      this.snackBar.open('Could not copy regex to clipboard', 'DISMISS', { duration: 3000 });
    }
  }
}
