import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroRegistroComponent } from './libro-registro.component';

describe('LibroComponent', () => {
  let component: LibroRegistroComponent;
  let fixture: ComponentFixture<LibroRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
