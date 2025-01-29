import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoListaComponent } from './prestamo-lista.component';

describe('PrestamoComponent', () => {
  let component: PrestamoListaComponent;
  let fixture: ComponentFixture<PrestamoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
