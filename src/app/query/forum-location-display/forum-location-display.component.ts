import { Component, Input, OnInit } from '@angular/core';
import { ForumLoc } from '../regex-entity.model';

@Component({
  selector: 'app-forum-location-display',
  templateUrl: './forum-location-display.component.html',
  styleUrls: ['./forum-location-display.component.scss']
})
export class ForumLocationDisplayComponent implements OnInit {

  @Input() location!: ForumLoc;

  constructor() { }

  ngOnInit(): void {
  }

}
