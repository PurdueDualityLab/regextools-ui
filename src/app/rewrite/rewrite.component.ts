import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { RewriteService } from './rewrite.service';

@Component({
  selector: 'app-rewrite',
  templateUrl: './rewrite.component.html',
  styleUrls: ['./rewrite.component.scss']
})
export class RewriteComponent implements OnInit {

  regexInput = new FormControl<string>('', [Validators.required]);
  unsubscribe$ = new Subject<void>();
  loading$ = new BehaviorSubject<boolean>(false);
  rewrittenRegex = '';

  constructor(
    private readonly rewriteService: RewriteService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.loading$.next(true);
    this.rewriteService.rewrite(this.regexInput.value!).subscribe({
      next: (rewrittenRe: string | null) => {
        if (rewrittenRe) {
          this.loading$.next(false);
          this.rewrittenRegex = rewrittenRe;
        } else {
          this.loading$.next(false);
          this.router.navigate(['/error']).then();
        }
      },
    })
  }

  showClipboardConfirmation(): void {
    this.snackBar.open('Rewritten regex copied to clipboard', 'Dismiss', { duration: 3000 });
  }

  unescapeRegex(re: string): string {
    return re.replace(/(?:\\(.))/g, '$1');
  }
}
