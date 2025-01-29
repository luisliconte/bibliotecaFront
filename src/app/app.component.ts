import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'biblioteca';
  creador: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/project-info.json').subscribe(data => {
      this.creador = data.creador;
      console.log("%c" + this.creador, "color: blue; font-size: 14px;");
    });
  }
}
