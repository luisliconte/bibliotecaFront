import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoRegistroComponent } from './prestamo-registro.component';

describe('PrestamoComponent', () => {
  let component: PrestamoRegistroComponent;
  let fixture: ComponentFixture<PrestamoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamoRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
