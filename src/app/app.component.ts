import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { GestureController, GestureDetail, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private open: boolean = false;
  isCardActive: boolean = false;
  startXPerc: number;

  constructor(
    private gestureCtrl: GestureController,
    private cdRef: ChangeDetectorRef,
    private el: ElementRef,
    private platform: Platform
  ) { }

  ngAfterViewInit() {
      const gesture = this.gestureCtrl.create({
      el: document.querySelector('ion-app'),
      onStart: () => this.onStart(),
      onMove: (detail) => this.onMove(detail),
      onEnd: (detail) => this.onEnd(detail),
      gestureName: 'example',
    });

    gesture.enable();
  }

  public openMenu() {
    let menu: HTMLElement = document.querySelector('.side-menu');
    let menuBar1: HTMLElement = document.querySelector('.menu-button div:nth-child(1)');
    let menuBar2: HTMLElement = document.querySelector('.menu-button div:nth-child(2)');
    let menuBar3: HTMLElement = document.querySelector('.menu-button div:nth-child(3)');
    if (!this.open) {
      menu.style.left = "0";
      menuBar1.style.transform = "rotate(45deg)"      
      menuBar1.style.top = "50%";
      menuBar2.style.width = "0%";
      menuBar3.style.transform = "rotate(-45deg)"      
      menuBar3.style.top = "50%";
      this.open = true;
    }else{
      menu.style.left = "100%";
      menuBar1.style.transform = "rotate(0deg)"      
      menuBar1.style.top = "0";
      menuBar2.style.width = "100%";
      menuBar3.style.transform = "rotate(0deg)"      
      menuBar3.style.top = "100%";
      this.open = false;
    }
  }
  public openLink(link: string): void {
    window.open(link);
  }

  private onStart() {
    this.isCardActive = true;
    this.cdRef.detectChanges();
  }

  private onMove(detail: GestureDetail) {
    
  }

  private onEnd(detail: GestureDetail) {
    this.isCardActive = false;
    const { type, currentX, currentY, deltaX, deltaY, startX, startY, velocityX } = detail;

    let startXPerc = Math.round((startX / this.platform.width()) * 100)

    if ((startXPerc > 80 && deltaX < -100 && !this.open) || (startXPerc < 20 && deltaX > 100 && this.open)) {
      this.openMenu();
    }
    this.cdRef.detectChanges();
  }
}
