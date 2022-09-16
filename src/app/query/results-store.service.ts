import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegexDBQuery, RegexDBResponse } from './query.model';

export type ResultState = 'added' | 'removed' | 'same';

export interface ResultsState {
  results: string[];
  added: string[];
  removed: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ResultsStoreService extends ComponentStore<ResultsState> {

  readonly results$ = this.select(state => state.results);
  readonly added$ = this.select(state => state.added);
  readonly removed$ = this.select(state => state.removed);
  readonly same$ = this.select(state => state.results.filter(item => !(state.added.includes(item) || state.removed.includes(item))));

  readonly updateResults = this.updater((state, newResults: string[]) => {
    // Figure out which are new
    const addedResults = newResults.filter(res => !state.results.includes(res));
    const removedResults = state.results.filter(res => !newResults.includes(res));

    return {
      results: newResults,
      added: addedResults,
      removed: removedResults,
    };
  });

  readonly query = this.effect((regexQuery$: Observable<RegexDBQuery>) => regexQuery$.pipe(
    switchMap(query => this.http.post<RegexDBResponse>(`${environment.apiBase}/query`, query).pipe(
      map(response => response.results),
      tapResponse(
        (results) => this.updateResults(results),
        (error) => console.log(error),
      )
    )),
  ));

  constructor(
    private readonly http: HttpClient,
  ) {
    super({
      results: [],
      added: [],
      removed: [],
    });
  }
}
