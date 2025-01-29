import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            {
                path: 'libro',
                loadComponent: () =>
                    import('./features/libro-lista/components/containers/libro-lista-container.component').then((m) => m.LibroListaContainerComponent),
            },
            {
                path: 'autor',
                loadComponent: () =>
                    import('./features/autor-lista/components/containers/autor-lista-container.component').then((m) => m.AutorListaContainerComponent),
            },
            {
                path: 'prestamo',
                loadComponent: () =>
                    import('./features/prestamo-lista/components/containers/prestamo-lista-container.component').then((m) => m.PrestamoListaContainerComponent),
            },

        ],
    },
    { path: '**', redirectTo: '' },
];
