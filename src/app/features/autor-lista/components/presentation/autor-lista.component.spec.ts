import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorListaComponent } from './autor-lista.component';

describe('AutorComponent', () => {
  let component: AutorListaComponent;
  let fixture: ComponentFixture<AutorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
