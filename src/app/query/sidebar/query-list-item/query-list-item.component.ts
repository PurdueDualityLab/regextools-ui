import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-query-list-item',
  templateUrl: './query-list-item.component.html',
  styleUrls: ['./query-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryListItemComponent implements OnInit {

  @Input() text = '';
  @Output() edited = new EventEmitter<{ old: string, new: string }>();
  @Output() removed = new EventEmitter<string>();

  hovered = false;
  editMode = false;

  editText = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.editText.setValue(this.text);
  }
}
