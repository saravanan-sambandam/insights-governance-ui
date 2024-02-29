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

  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;

  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: undefined,
  };

  reportConfigResponse!: ConfigResponse;

  /**
   * Map of event handlers to be applied to the embedded report
   */
  // Update event handlers for the report by redefining the map using this.eventHandlersMap
  // Set event handler to null if event needs to be removed
  // More events can be provided from here
  // https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
  eventHandlersMap = new Map([
    [
      'loaded',
      () => {
        const report = this.reportObj.getReport();
        report.setComponentTitle('Embedded report');
        console.log('Report has loaded');
      },
    ],
    ['rendered', () => console.log('Report has rendered')],
    [
      'error',
      (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
  ]) as Map<
    string,
    (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null
  >;

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

  constructor(
    public httpService: HttpService,
    private element: ElementRef<HTMLDivElement>
  ) {}

  /**
   * Embeds report
   *
   * @returns Promise<void>
   */

  ngOnInit(): void {}

  showReport() {
    this.embedReport();
    // this.isEmbedded = true;
  }
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

  /**
   * Change Visual type
   *
   * @returns Promise<void>
   */
  async changeVisualType(): Promise<void> {
    // Get report from the wrapper component
    const report: Report = this.reportObj.getReport();

    if (!report) {
      this.displayMessage = 'Report not available.';
      console.log(this.displayMessage);
      return;
    }

    // Get all the pages of the report
    const pages: Page[] = await report.getPages();

    // Check if the pages are available
    if (pages.length === 0) {
      this.displayMessage = 'No pages found.';
      return;
    }

    // Get active page of the report
    const activePage: Page | undefined = pages.find((page) => page.isActive);

    if (!activePage) {
      this.displayMessage = 'No Active page found';
      return;
    }

    try {
      // Change the visual type using powerbi-report-authoring
      // For more information: https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/report-authoring-overview
      // Get the visual
      const visual = await activePage.getVisualByName('VisualContainer6');

      const response = await visual.changeType('lineChart');

      this.displayMessage = `The ${visual.type} was updated to lineChart.`;

      console.log(this.displayMessage);

      return response;
    } catch (error) {
      if (error === 'PowerBIEntityNotFound') {
        console.log('No Visual found with that name');
      } else {
        console.log(error);
      }
    }
  }

  /**
   * Hide Filter Pane
   *
   * @returns Promise<IHttpPostMessageResponse<void> | undefined>
   */
  async hideFilterPane(): Promise<IHttpPostMessageResponse<void> | undefined> {
    // Get report from the wrapper component
    const report: Report = this.reportObj.getReport();

    if (!report) {
      this.displayMessage = 'Report not available.';
      console.log(this.displayMessage);
      return;
    }

    // New settings to hide filter pane
    const settings = {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
    };

    try {
      const response = await report.updateSettings(settings);
      this.displayMessage = 'Filter pane is hidden.';
      console.log(this.displayMessage);

      return response;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /**
   * Set data selected event
   *
   * @returns void
   */
  setDataSelectedEvent(): void {
    // Adding dataSelected event in eventHandlersMap
    this.eventHandlersMap = new Map<
      string,
      (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null
    >([
      ...this.eventHandlersMap,
      ['dataSelected', (event) => console.log(event)],
    ]);

    this.displayMessage =
      'Data Selected event set successfully. Select data to see event in console.';
  }
}
