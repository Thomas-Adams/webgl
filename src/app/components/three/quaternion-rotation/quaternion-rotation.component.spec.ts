import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaternionRotationComponent } from './quaternion-rotation.component';

describe('QuaternionRotationComponent', () => {
  let component: QuaternionRotationComponent;
  let fixture: ComponentFixture<QuaternionRotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuaternionRotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaternionRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
