import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryListItemComponent } from './query-list-item.component';

describe('QueryListItemComponent', () => {
  let component: QueryListItemComponent;
  let fixture: ComponentFixture<QueryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
