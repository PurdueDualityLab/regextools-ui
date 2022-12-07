import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { withLatestFrom, } from 'rxjs/operators';
import { RegexDBQuery } from './query.model';
import { QueryRequest, QueryResponse, QueryService } from './query.service';

export type ResultState = 'added' | 'removed' | 'same';

export interface ResultsState {
  results: string[];
  total: number;
  loading: boolean;
  cacheKey?: string;
  pageSize?: number;
  pageNum?: number;
  pageCount?: number;
}

const resultStateFromQueryResponse = (response: QueryResponse): ResultsState => ({
  results: response.results,
  total: response.total,
  loading: false,
  cacheKey: response.cacheKey,
  pageSize: response.pageSize,
  pageNum: response.pageNum,
  pageCount: response.pageCount,
})

@Injectable({
  providedIn: 'root'
})
export class ResultsStoreService extends ComponentStore<ResultsState> {

  /* Selectors */
  readonly isLoading$ = this.select(state => state.loading);
  readonly results$ = this.select(state => state.results);
  readonly cacheKey$ = this.select(state => state.cacheKey);
  readonly pageSize$ = this.select(state => state.pageSize);
  readonly pageNum$ = this.select(state => state.pageNum);
  readonly pageCount$ = this.select(state => state.pageCount);
  readonly hasResults$ = this.select(state => state.results.length > 0);
  readonly resultCount$ = this.select(state => state.total);
  readonly pageState$ = this.select(state => ({ pageSize: state.pageSize ?? 0, pageNum: state.pageNum ?? 0, pageCount: state.total }));

  /* Updaters */
  readonly setLoading = this.updater((state, isLoading: boolean) => ({ ...state, loading: isLoading }));
  readonly setStateFromResponse = this.updater((state, queryResponse: QueryResponse) => resultStateFromQueryResponse(queryResponse));
  readonly clear = this.updater(() => ({ results: [], loading: false, total: 0 }));
  readonly updatePaging = this.updater((state, pageEv: PageEvent) => ({ ...state, pageCount: pageEv.length, pageSize: pageEv.pageSize, pageNum: pageEv.pageIndex }));

  /* Effects */
  readonly executeQuery = this.effect((query$: Observable<RegexDBQuery>) => query$.pipe(
    tap(() => this.setLoading(true)),
    withLatestFrom(this.cacheKey$, this.pageSize$, this.pageNum$),
    map(([query, cacheKey, pageSize, pageNum]) => {
      console.log(`ExecuteQuery: got cache key ${cacheKey}`);
      if ([pageSize && pageNum]) {
        // load the rest of the paging info
        return {
          ...query,
          pageRequest: {
            pageSize: pageSize!,
            pageNum: pageNum!,
            cacheKey: cacheKey
          }
        } as QueryRequest;
      } else {
        // We have no paging info, so don't send it over
        return { ...query } as QueryRequest;
      }
    }),
    tapResponse(
      request => {
        console.log('ExecuteQuery::tapResponse - executing query...');
        const results$ = this.queryService.execute(request);
        console.log('ExecuteQuery::tapResponse - updating state...');
        this.setStateFromResponse(results$); // This clears the loading flag
        console.log('ExecuteQuery::tapResponse - done')
      },
      err => {
        console.error(err)
      },
    )
  ));

  readonly handlePage = this.effect((pageEvent$: Observable<PageEvent>) => pageEvent$.pipe(
    tapResponse(
      pageEvent => {
        console.log('Handling page event');
        // Update the paging info held in the state
        this.updatePaging(pageEvent);
        // Reinvoke the query, which uses the paging info from inside the state
        this.executeQuery({ positive: [], negative: [] });
      },
      err => console.error(err),
    )
  ));

  constructor(
    private readonly queryService: QueryService,
  ) {
    super({
      results: [],
      total: 0,
      loading: false,
      pageSize: 10,
      pageNum: 0
    });
  }
}
