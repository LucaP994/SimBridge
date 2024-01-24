import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import type { GestureDetail } from '@ionic/angular';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { HostListener } from '@angular/core';

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
  private scrolling = false;
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
    let reader = document.querySelector(".ng2-pdf-viewer-container");
    reader.addEventListener("scroll", (event) => {
      let scrollTopBtn: HTMLElement = document.querySelector(".scroll-top");
      if (reader.scrollTop > 400) {
        scrollTopBtn.style.left = "1rem";
      } else {
        scrollTopBtn.style.left = "-5rem";
      }
    })
    reader.addEventListener("click", (event) => {
      if (this.scrolling) {
        this.scrolling = false;
      }
    })
  }
  public scrollTop() {
    this.scrolling = true;
    let reader = document.querySelector(".ng2-pdf-viewer-container");
    let scroll = setInterval(() => {
      reader.scrollTop = reader.scrollTop - 80;
      if (reader.scrollTop == 0 || !this.scrolling) {
        clearInterval(scroll);
      }
    }, 5)

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
    let viewer: HTMLElement = document.querySelector(".pdf-viewer");
    let reader = document.querySelector(".ng2-pdf-viewer-container");
    setTimeout(() => {
      reader.scrollTop = 0;
    }, 300)
    this.scrolling = false;
    viewer.style.top = "100%";
  }
  public handleScroll(evt: any) {
    console.log(evt)
  }
  
}
