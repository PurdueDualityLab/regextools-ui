import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RemoteSourceLoc } from '../regex-entity.model';
import { extractRepoName } from './extract-repo-name';

@Component({
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationDisplayComponent implements OnInit {

  @Input() location!: RemoteSourceLoc;

  constructor(
  ) { }

  get repoName(): string {
    return extractRepoName(this.location.repoLocation);
  }

  get repoPermaLink(): string {
    return `${this.location.repoLocation}/blob/${this.location.commit}/${this.location.sourceFile}#L${this.location.lineNumber}`;
  }

  ngOnInit(): void {
  }
}
