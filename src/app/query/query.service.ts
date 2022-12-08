import { HttpClient, HttpParams } from '@angular/common/http';
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
    });
  }
}
