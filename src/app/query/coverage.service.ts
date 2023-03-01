import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CoverageInfo {
  total: number;
  positive: number;
  negative: number;
}

@Injectable()
export class CoverageService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  computeRegexCoverage(regex: string, positive: string[], negative: string[]): Observable<CoverageInfo> {
    return this.httpClient.post<CoverageInfo>(`${environment.apiBase}/coverage`, {
      regex, positive, negative
    });
  }
}
