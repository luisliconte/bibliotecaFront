import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorRegistroComponent } from './autor-registro.component';

describe('AutorComponent', () => {
  let component: AutorRegistroComponent;
  let fixture: ComponentFixture<AutorRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
