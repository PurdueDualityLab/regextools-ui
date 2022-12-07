import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { ErrorState } from '../error/error-state';
// import { ErrorService } from '../error/error.service';

export interface StaticAnalysisRequest {
  regex: string;
}

export interface StaticAnalysisResponse {
  output: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(
    private readonly http: HttpClient,
    // private readonly errorService: ErrorService,
  ) { }

  analyze(regex: string): Observable<StaticAnalysisResponse | null> {
    return this.http.post<StaticAnalysisResponse>(`${environment.analysisServiceUrl}/analyze`, { regex })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          /*
          let errorState: ErrorState = {
            title: "Error while performing analysis",
            message: `Error encountered: ${err.message}`,
            data: err
          };

          Set the error and return null
          this.errorService.setErrorState(errorState);*/
          return of(null);
        })
      );
  }
}
