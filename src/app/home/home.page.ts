import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { HttpInterceptorService } from '../services/http-interceptor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public ip = "";
  public port = "";
  public url = "";
  private found: boolean = false;
  public searching: boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private httpInterceptorService: HttpInterceptorService
  ) { }

  ngAfterViewInit() {
    let ip: string[] = JSON.parse(localStorage.getItem("ip"));
    if (ip != null) {
      this.ip = ip[0];
      this.port = ip[1];
    }
    this.httpInterceptorService.stopSearch.subscribe(res =>{
      if(res){
        this.searching = false;
      }
    })
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
            if(this.searching){
              this.pingServer(ip + 1)
              console.log("Server found err: " + this.found)
              console.log(err)
            }
          }
        })
    }else{
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
