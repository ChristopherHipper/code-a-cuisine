import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Header, RouterLink],
  selector: 'app-landing-page',
  styleUrl: './landing-page.css',
  templateUrl: './landing-page.html',
})
export class LandingPage {}
