import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewriteComponent } from './rewrite.component';

describe('RewriteComponent', () => {
  let component: RewriteComponent;
  let fixture: ComponentFixture<RewriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
