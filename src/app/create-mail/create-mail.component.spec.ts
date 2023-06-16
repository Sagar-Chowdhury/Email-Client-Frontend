import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMailComponent } from './create-mail.component';

describe('CreateMailComponent', () => {
  let component: CreateMailComponent;
  let fixture: ComponentFixture<CreateMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMailComponent]
    });
    fixture = TestBed.createComponent(CreateMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
