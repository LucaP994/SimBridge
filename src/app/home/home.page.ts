import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public ip = "";
  public port = "";
  public url = "";
  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() {
    let ip: string[] = JSON.parse(localStorage.getItem("ip"));
    if (ip != null) {
      this.ip = ip[0];
      this.port = ip[1];
    }
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
  public openChecklist() {
    this.url = "../../assets/documents/checklist.pdf";
    let viewer: HTMLElement = document.querySelector(".pdf-viewer")!;
    viewer.style.display = "block";
  }
  public openGuide() {
    this.url = "../../assets/documents/instruments.pdf";
    let viewer: HTMLElement = document.querySelector(".pdf-viewer")!;
    viewer.style.display = "block";
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
    viewer.style.display = "none";
  }
}
