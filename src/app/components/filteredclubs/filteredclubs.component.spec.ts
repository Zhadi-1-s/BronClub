import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredclubsComponent } from './filteredclubs.component';

describe('FilteredclubsComponent', () => {
  let component: FilteredclubsComponent;
  let fixture: ComponentFixture<FilteredclubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredclubsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredclubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
