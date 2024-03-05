import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import {
  IReportEmbedConfiguration,
  models,
  Page,
  Report,
  service,
  Embed,
} from 'powerbi-client';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import { IHttpPostMessageResponse } from 'http-post-message';
import 'powerbi-report-authoring';

import { reportUrl } from '../../../../public/constants';
import { HttpService } from '../../../services/http.service';

import { ConfigResponse } from '../../../../public/constants';

@Component({
  selector: 'app-powerbi',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.scss'],
})
export class PowerbiComponent implements OnInit {
  @ViewChild('iframeRef', { static: false }) iframeRef?: ElementRef;

  // Wrapper object to access report properties
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;

  // Track Report embedding status
  isEmbedded = false;

  // Overall status message of embedding
  displayMessage =
    'The report is bootstrapped. Click Embed Report button to set the access token.';

  // CSS Class to be passed to the wrapper
  reportClass = 'report-container';

  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: {
      panes: {
        filters: {
          visible: true
        },
        pageNavigation: {
          visible: true
        }
      },
      bars: {
        statusBar: {
          visible: true
        }
      }
    }
  };

  reportConfigResponse!: ConfigResponse;


  constructor(
    public httpService: HttpService
  ) { }



  ngOnInit(): void {
    this.embedReport();
  }

  /**
   * Embed Power BI using application
  */
  async embedReport(): Promise<void> {
    // Get the embed config from the service and set the reportConfigResponse
    try {
      this.reportConfigResponse = <ConfigResponse>(
        await this.httpService.getEmbedConfig(reportUrl).toPromise()
      );
    } catch (error: any) {
      this.displayMessage = `Failed to fetch config for report. Status: ${error.status} ${error.statusText}`;
      console.error(this.displayMessage);
      return;
    }

    console.log('reportConfigResponse', this.reportConfigResponse);

    // Update the reportConfig to embed the PowerBI report
    this.reportConfig = {
      ...this.reportConfig,
      id: this.reportConfigResponse.Id,
      embedUrl: this.reportConfigResponse.EmbedUrl,
      accessToken: this.reportConfigResponse.EmbedToken.Token,
    };

    this.isEmbedded = true;
    // Update embed status

    // Update the display message
    this.displayMessage =
      'Use the buttons above to interact with the report using Power BI Client APIs.';
  }

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
