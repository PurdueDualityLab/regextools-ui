import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, of } from 'rxjs';

export interface RegexTool {
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tools: RegexTool[] = [
    {
      title: 'Regex Database',
      description: 'Search a database of existing regexes to find one that fits your usecase',
      link: '/query'
    },
    {
      title: 'Regex Rewriter',
      description: 'Rewrite potentially dangerous regular expressions',
      link: '/rewrite'
    },
    {
      title: 'Regex Static Analysis',
      description: 'Analyze regular expressions',
      link: '/analyze'
    }
  ];

  colCount$ = of(3);

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.colCount$ = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
      .pipe(
        map(isMatched => isMatched.matches ? 1 : 3)
      );
  }
}
