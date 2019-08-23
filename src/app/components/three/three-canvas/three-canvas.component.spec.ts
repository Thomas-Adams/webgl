import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCanvasComponent } from './three-canvas.component';

describe('ThreeCanvasComponent', () => {
  let component: ThreeCanvasComponent;
  let fixture: ComponentFixture<ThreeCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
