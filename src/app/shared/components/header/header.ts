import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TuiButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
