import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, take } from 'rxjs';
import { QueryStoreService } from '../query-store.service';
import { ResultsStoreService } from '../results-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  positiveExamples$ = this.queryStore.positive$;
  negativeExamples$ = this.queryStore.negative$;
  hasExamples$ = this.queryStore.hasExamples$;

  exampleForm = this.fb.group({
    exampleText: [null, Validators.required],
    category: ['positive'],
  });

  readonly categories = [
    'positive',
    'negative'
  ];

  readonly categoryActionMap: Map<string, (val: string | Observable<string>) => Subscription> = new Map([
    ['positive', this.queryStore.addPositive.bind(this.queryStore)],
    ['negative', this.queryStore.addNegative.bind(this.queryStore)]
  ]);

  constructor(
    private readonly fb: FormBuilder,
    private readonly queryStore: QueryStoreService,
    private readonly resultsStore: ResultsStoreService,
  ) { }

  ngOnInit(): void {
  }

  addExample() {
    const formValue = this.exampleForm.value;
    const updater = this.categoryActionMap.get(formValue.category ?? '');
    if (updater && formValue.exampleText) {
      updater(formValue.exampleText);

      this.exampleForm.get('exampleText')?.reset();
    }
  }

  updateExample(category: string, update: { old: string, new: string }) {
    if (category === 'positive') {
      this.queryStore.updatePositive(update);
    } else if (category === 'negative') {
      this.queryStore.updateNegative(update);
    }
  }

  removeExample(category: string, ex: string) {
    if (category === 'positive') {
      this.queryStore.removePositive(ex);
    } else if (category === 'negative') {
      this.queryStore.removeNegative(ex);
    }
  }

  onQuery() {
    // TODO this might be leaking memory???
    this.resultsStore.executeQuery(this.queryStore.query$.pipe(take(1)));
  }

  onResetForm() {
    this.queryStore.clear();
  }

  moveItem(event: CdkDragDrop<string[] | null>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data ?? [], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data ?? [],
        event.container.data ?? [],
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
