import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
}
