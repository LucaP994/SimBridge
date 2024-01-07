import { Component, OnInit } from '@angular/core';
import { HttpInterceptorService } from 'src/app/services/http-interceptor.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent  implements OnInit {
  public showExit: boolean = false;
  constructor(
    private httpIntercetorService: HttpInterceptorService
  ) { }

  ngOnInit() {}
  ngAfterViewInit() {
    let searchingP: HTMLElement = document.querySelector('.searching');
    let i = 0;
    setInterval(()=>{
      if(i < 4){
        searchingP.innerText = searchingP.innerText+"."
        i++;
      }else{
        searchingP.innerText = searchingP.innerText.substring(0, searchingP.innerText.length-4);
        i = 0;
      }
    },500) 
    setTimeout(()=>{this.showExit = true},5000)
  }
  public stopSearch(){
    this.httpIntercetorService.stop();
  }
}
