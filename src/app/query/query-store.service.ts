import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { RegexDBQuery } from './query.model';

export interface QueryState {
  positive: string[];
  negative: string[];
}

@Injectable()
export class QueryStoreService extends ComponentStore<QueryState> {

  readonly positive$ = this.select(state => state.positive);
  readonly negative$ = this.select(state => state.negative);

  readonly hasExamples$ = this.select(state => state.positive.length > 0 || state.negative.length > 0);

  readonly query$ = this.select(state => ({ positive: state.positive, negative: state.negative } as RegexDBQuery));

  readonly addPositive = this.updater((state, example: string) => ({
    ...state,
    positive: [...state.positive, example]
  }));

  readonly addNegative = this.updater((state, example: string) => ({
    ...state,
    negative: [...state.negative, example]
  }));

  readonly updatePositive = this.updater((state, update: { old: string, new: string }) => {
    const replaceIdx = state.positive.findIndex(ex => ex === update.old);
    const newPositive = [...state.positive];
    newPositive[replaceIdx] = update.new;

    return {
      ...state,
      positive: newPositive
    };
  });

  readonly updateNegative = this.updater((state, update: { old: string, new: string }) => {
    const replaceIdx = state.negative.findIndex(ex => ex === update.old);
    const newNegative = [...state.negative];
    newNegative[replaceIdx] = update.new;

    return {
      ...state,
      negative: newNegative
    };
  });

  readonly removePositive = this.updater((state, toRemove: string) => {
    const idx = state.positive.findIndex(ex => ex === toRemove);
    const newPositive = [...state.positive];
    newPositive.splice(idx, 1);

    return {
      ...state,
      positive: newPositive
    };
  });

  readonly removeNegative = this.updater((state, toRemove: string) => {
    const idx = state.negative.findIndex(ex => ex === toRemove);
    const newNegative = [...state.negative];
    newNegative.splice(idx, 1);

    return {
      ...state,
      negative: newNegative
    };
  });

  readonly clear = this.updater(() => ({
    positive: [],
    negative: []
  }));

  constructor() {
    super({
      positive: [],
      negative: []
    });
  }
}
