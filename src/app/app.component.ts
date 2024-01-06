import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private open: boolean = false;

  constructor() { }

  public openMenu() {
    let menu: HTMLElement = document.querySelector('.side-menu');
    let menuBar1: HTMLElement = document.querySelector('.menu-button div:nth-child(1)');
    let menuBar2: HTMLElement = document.querySelector('.menu-button div:nth-child(2)');
    let menuBar3: HTMLElement = document.querySelector('.menu-button div:nth-child(3)');
    if (!this.open) {
      menu.style.left = "0";
      menuBar1.style.transform = "rotate(45deg)"      
      menuBar1.style.top = "50%";
      menuBar2.style.display = "none";
      menuBar3.style.transform = "rotate(-45deg)"      
      menuBar3.style.top = "50%";
      this.open = true;
    }else{
      menu.style.left = "100%";
      menuBar1.style.transform = "rotate(0deg)"      
      menuBar1.style.top = "0";
      menuBar2.style.display = "block";
      menuBar3.style.transform = "rotate(0deg)"      
      menuBar3.style.top = "100%";
      this.open = false;
    }
  }
  public openLink(link: string): void {
    window.open(link);
  }
}
