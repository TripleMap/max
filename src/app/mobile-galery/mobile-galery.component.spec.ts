import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileGaleryComponent } from './mobile-galery.component';

describe('MobileGaleryComponent', () => {
  let component: MobileGaleryComponent;
  let fixture: ComponentFixture<MobileGaleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileGaleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
