// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Endpoint to get report config
export const reportUrl = 'https://aka.ms/CaptureViewsReportEmbedConfig';

// Handles the embed config response for embedding
export interface ConfigResponse {
  Id: string;
  EmbedUrl: string;
  EmbedToken: {
    Token: string;
  };
}
