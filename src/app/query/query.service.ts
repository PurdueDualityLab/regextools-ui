import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PageRequest {
  cacheKey?: string;
  pageNum: number;
  pageSize: number;
}

export interface QueryRequest {
  positive: string[];
  negative: string[];
  pageRequest?: PageRequest;
}

export interface QueryResponse {
  results: string[];
  total: number;
  cacheKey: string;
  pageCount: number;
  pageSize: number;
  pageNum: number;
}

@Injectable()
export class QueryService {

  constructor(
    private readonly http: HttpClient
  ) { }

  execute(request: QueryRequest): Observable<QueryResponse> {
    return this.http.post<QueryResponse>(`${environment.apiBase}/query`, request);
  }
}
