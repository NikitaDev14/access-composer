import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitClientFormComponent } from './init-client-form.component';

describe('InitClientFormComponent', () => {
  let component: InitClientFormComponent;
  let fixture: ComponentFixture<InitClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitClientFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
