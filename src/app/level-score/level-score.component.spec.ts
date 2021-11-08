import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelScoreComponent } from './level-score.component';

describe('LevelScoreComponent', () => {
  let component: LevelScoreComponent;
  let fixture: ComponentFixture<LevelScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
