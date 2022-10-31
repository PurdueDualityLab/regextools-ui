import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegexDBQuery, RegexDBResponse } from './query.model';

export type ResultState = 'added' | 'removed' | 'same';

export interface ResultsState {
  results: string[];
  added: number[];
  removed: string[];
  same: number[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsStoreService extends ComponentStore<ResultsState> {

  readonly isLoading$ = this.select(state => state.loading);
  readonly results$ = this.select(state => state.results);
  readonly added$ = this.select(state => state.added.map(idx => state.results[idx]));
  readonly removed$ = this.select(state => state.removed);
  readonly same$ = this.select(state => state.same.map(idx => state.results[idx]));
  readonly resultCount$ = this.select(state => state.results.length);
  readonly hasResults$ = this.select(state => state.results.length > 0);

  readonly updateResults = this.updater((state, newResults: string[]) => {
    if (state.results.length === 0) {
      // fill out the new stuff when there's something to compare against
      return {
        ...state,
        results: newResults,
        same: newResults.map((_, idx) => idx)
      };
    }

    // Figure out which are new
    const addedResultsIdx = newResults.filter(res => !state.results.includes(res)).map(result => newResults.indexOf(result));
    const removedResults = state.results.filter(res => !newResults.includes(res));
    const sameResultsIdx = newResults.filter(result => state.results.includes(result)).map(result => newResults.indexOf(result));

    return {
      results: newResults,
      added: addedResultsIdx,
      removed: removedResults,
      same: sameResultsIdx,
      loading: false,
    };
  });

  readonly toggleLoadingState = this.updater((state, newLoadingState: boolean) => ({ ...state, loading: newLoadingState }));

  readonly clear = this.updater(() => ({ results: [], added: [], removed: [], same: [], loading: false }));

  readonly query = this.effect((regexQuery$: Observable<RegexDBQuery>) => regexQuery$.pipe(
    tapResponse(
      () => this.toggleLoadingState(true), // set loading first. Gets unset when updateResults completes
      (err) => console.log(err)
    ),
    switchMap(query => this.http.post<RegexDBResponse>(`${environment.apiBase}/query`, query).pipe(
      map(response => response.results),
      tapResponse(
        (results) => {
          this.toggleLoadingState(false);
          this.updateResults(results);
        },
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
      same: [],
      loading: false,
    });
  }
}
