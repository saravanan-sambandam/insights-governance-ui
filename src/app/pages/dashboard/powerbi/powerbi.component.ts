import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-powerbi',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.scss']
})

export class PowerbiComponent {
  @ViewChild('iframeRef', { static: false }) iframeRef?: ElementRef;

  // Loading Power BI using Iframe
  reloadIframe() {
    // Access the iframe and reload its content
    if (this.iframeRef?.nativeElement) {
      let iframeSrc = this.iframeRef.nativeElement.src;
      if (iframeSrc) {
        this.iframeRef.nativeElement.src = iframeSrc;
      }
    }
  }

}
