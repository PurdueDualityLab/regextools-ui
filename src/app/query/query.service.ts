import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegexEntity } from './regex-entity.model';

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
  results: RegexEntity[];
  sortScores: number[];
  total: number;
  cacheKey: string;
  pageCount: number;
  pageSize: number;
  pageNum: number;
}

export interface ParticipantTrackingInfo {
  participantId: string;
  taskId: number;
}

@Injectable()
export class QueryService {

  constructor(
    private readonly http: HttpClient
  ) { }

  execute(request: QueryRequest, trackingInfo: ParticipantTrackingInfo | null): Observable<QueryResponse> {
    let httpParams = new HttpParams();
    if (trackingInfo) {
      httpParams = httpParams.append('participantId', trackingInfo.participantId);
      httpParams = httpParams.append('taskId', trackingInfo.taskId);
    }

    return this.http.post<QueryResponse>(`${environment.apiBase}/query`, request, {
      params: httpParams
    }).pipe(
      map(response => {
        const fixedResults = response.results.map(result => ({ ...result, sourceLocations: result.sourceLocations ?? [], forumLocations: result.forumLocations ?? [] }));
        return ({ ...response, results: fixedResults });
      }),
    );
  }
}
