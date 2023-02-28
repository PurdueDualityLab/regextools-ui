import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumLocationDisplayComponent } from './forum-location-display.component';

describe('ForumLocationDisplayComponent', () => {
  let component: ForumLocationDisplayComponent;
  let fixture: ComponentFixture<ForumLocationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumLocationDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumLocationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
