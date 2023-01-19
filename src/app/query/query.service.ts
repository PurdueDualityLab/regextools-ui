import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    /*
    let httpParams = new HttpParams();
    if (trackingInfo) {
      httpParams = httpParams.append('participantId', trackingInfo.participantId);
      httpParams = httpParams.append('taskId', trackingInfo.taskId);
    }

    return this.http.post<QueryResponse>(`${environment.apiBase}/query`, request, {
      params: httpParams
    });*/
    return of({
      results: [
        {
          pattern: 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)',
          license: 'GPLv3',
          location: {
            repo: 'https://github.com/softwaresale/crossclip',
            file: 'src/app/content-classifiers/link-classifier.ts',
            lineNo: 5,
            commit: 'e82c687ed97b63e3a8d1dc0835d7c7c5e7dff0cb',
          }
        }
      ],
      total: 1,
      cacheKey: '',
      pageSize: 1,
      pageCount: 1,
      pageNum: 0
    } as QueryResponse);
  }
}
