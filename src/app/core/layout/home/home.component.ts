import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SidenavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
