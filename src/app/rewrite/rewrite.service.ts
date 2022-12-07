import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { ErrorState } from '../error/error-state';
// import { ErrorService } from '../error/error.service';
import { StaticAnalysisResponse } from '../static-analysis/analysis.service';

@Injectable({
  providedIn: 'root'
})
export class RewriteService {

  constructor(
    private readonly http: HttpClient,
    // private readonly errorService: ErrorService,
  ) { }

  rewrite(regex: string): Observable<string | null> {
    return this.http.post<StaticAnalysisResponse>(`${environment.analysisServiceUrl}/rewrite`, { regex })
      .pipe(
        map(response => response.output),
        catchError((err: HttpErrorResponse) => {
          /*
          let errorState: ErrorState = {
            title: "Error while performing query",
            message: `Error encountered: ${err.message}`,
            data: err
          };
  
          // Set the error and return null
          this.errorService.setErrorState(errorState);*/
          return of(null)
        })
      );
  }
}
