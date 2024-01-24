import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import type { GestureDetail } from '@ionic/angular';
import { GestureController, IonCard, Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public ip = "";
  public port = "";
  public url = "";
  public docName = "";
  private found: boolean = false;
  public searching: boolean = false;
  public currentX = 0;;
  public currentY = 0;;
  public deltaX = 0;;
  public deltaY = 0;;
  public startX = 0;;
  public startY = 0;;
  isCardActive = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private httpInterceptorService: HttpInterceptorService,
    private gestureCtrl: GestureController,
    private cdRef: ChangeDetectorRef,
    private el: ElementRef,
    private platform: Platform
  ) { }

  ngAfterViewInit() {
    let ip: string[] = JSON.parse(localStorage.getItem("ip"));
    if (ip != null) {
      this.ip = ip[0];
      this.port = ip[1];
    }
    this.httpInterceptorService.stopSearch.subscribe(res => {
      if (res) {
        this.searching = false;
      }
    })
    // const gesture = this.gestureCtrl.create({
    //   el: document.querySelector('.container'),
    //   onStart: () => this.onStart(),
    //   onMove: (detail) => this.onMove(detail),
    //   onEnd: () => this.onEnd(),
    //   gestureName: 'example',
    // });

    // gesture.enable();
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.closeViewer();
    });
  }

  public pingServer(ip: number) {
    this.searching = true;
    localStorage.clear();
    this.ip = "";
    this.port = "";
    console.log("Trying to reach IP: " + ip)
    if (!this.found && ip < 255) {
      this.http.get(`http://192.168.1.${ip}:8380/health`)
        .subscribe({
          next: (resp) => {
            this.found = true
            console.log("Server found next: " + this.found)
            console.log(resp)
            this.ip = `192.168.1.${ip}`;
            this.port = "8380";
            this.goToMCDU();
            this.searching = false
          },
          error: (err) => {
            if (this.searching) {
              this.pingServer(ip + 1)
              console.log("Server found err: " + this.found)
              console.log(err)
            }
          }
        })
    } else {
      alert("No server found on your LAN on port 8380. Please check your client.")
    }
  }

  private getPing(ip: number): Observable<any> {
    return this.http.get<any>(`http://192.168.1.${ip}:8380/interfaces/mcdu/`);
  }

  public goToMCDU() {
    if (this.checkIp(this.ip)) {
      if (this.port != "" && this.port != null) {
        this.port = this.port;
      } else {
        this.port = "8380";
      }
      let newIp: string[] = [this.ip, this.port];
      localStorage.setItem("ip", JSON.stringify(newIp));
      this.router.navigate(["/mcdu"], { replaceUrl: true, state: { ip: newIp } });
    } else {
      alert("Please, check yuour IP address!")
    }
  }
  public openDocument(file: string) {
    this.url = `../../assets/documents/${file}.pdf`;
    switch (file) {
      case "checklist":
        this.docName = "Checklist";
        break;
      case "sop":
        this.docName = "SOP";
        break;
      case "instruments":
        this.docName = "Instruments guide";
        break;
      default:
        this.docName = "Document";
        break;
    }
    let viewer: HTMLElement = document.querySelector(".pdf-viewer")!;
    viewer.style.top = "0";
  }
  private checkIp(ip: string): boolean {
    let valid: boolean = false;
    let strSplit: string[] = ip.split('.');

    if (ip != "" && strSplit.length > 3) {
      valid = true;
    }
    return valid;
  }
  public closeViewer() {
    let viewer: HTMLElement = document.querySelector(".pdf-viewer")!;
    viewer.style.top = "100%";
  }

  // private onStart() {
  //   this.isCardActive = true;
  //   this.cdRef.detectChanges();
  // }

  // private onMove(detail: GestureDetail) {
  //   const { type, currentX, currentY, deltaX, deltaY, startX, startY, velocityX } = detail;
    // this.currentX = currentX;
    // this.currentY = currentY;
    // this.deltaX = deltaX;
    // this.deltaY = deltaY;
    // this.startX = startX;
    // this.startY = startY;
    // this.debug.nativeElement.innerHTML =`
    //   <div>Type: ${type}</div>
    //   <div>Start X: ${Math.round((startX/this.platfom.width())*100)}%</div>
    //   <div>Start Y: ${Math.round((startY/this.platfom.height())*100)}%</div>
    //   <div>Current X: ${Math.round((currentX/this.platfom.width())*100)}%</div>
    //   <div>Current Y: ${Math.round((currentY/this.platfom.height())*100)}%</div>
    //   <div>Delta X: ${deltaX}</div>
    //   <div>Delta Y: ${deltaY}</div>
    //   <div>Velocity X: ${velocityX}</div>`;
  //   let startXPerc = Math.round((startX / this.platform.width()) * 100)
  //   if ((startXPerc < 15 && deltaX > 100) || (startXPerc > 85 && deltaX < -100)) {
  //     this.closeViewer()
  //   }
  // }

  // private onEnd() {
  //   this.isCardActive = false;
  //   this.cdRef.detectChanges();
  // }
}
