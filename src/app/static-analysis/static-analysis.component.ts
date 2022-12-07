import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalysisService, StaticAnalysisResponse } from './analysis.service';

@Component({
  selector: 'app-static-analysis',
  templateUrl: './static-analysis.component.html',
  styleUrls: ['./static-analysis.component.scss']
})
export class StaticAnalysisComponent implements OnInit {

  regexInput: FormControl = new FormControl(null, [Validators.minLength(1)]);
  info: string = '';

  constructor(
    private readonly analysisService: AnalysisService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  analyze(): void {
    this.analysisService.analyze(this.regexInput.value).subscribe((output: StaticAnalysisResponse | null) => {
      if (output) {
        this.info = output.output;
      } else {
        this.router.navigate(['/error']).then();
      }
    });
  }
}
