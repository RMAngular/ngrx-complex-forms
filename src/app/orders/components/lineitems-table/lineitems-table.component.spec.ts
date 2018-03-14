import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineitemsTableComponent } from './lineitems-table.component';

describe('LineitemsTableComponent', () => {
  let component: LineitemsTableComponent;
  let fixture: ComponentFixture<LineitemsTableComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LineitemsTableComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LineitemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
