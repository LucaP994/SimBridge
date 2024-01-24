import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mcdu',
  templateUrl: './mcdu.page.html',
  styleUrls: ['./mcdu.page.scss'],
})
export class MCDUPage implements OnInit {
  public ip = "";
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
    this.ip = this.router.getCurrentNavigation()!.extras.state!['ip']
    let mcdu: HTMLElement = document.querySelector("#mcdu-frame")!;
    mcdu.setAttribute("src",`http://${this.ip[0]}:${this.ip[1]}/interfaces/mcdu/`);
  }
  goBack(){
    this.router.navigate(["/"], { replaceUrl: true });
  }
}
