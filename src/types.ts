import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

export interface Config {
  port: number;
  debug: boolean;
  tyntecApikey: string;
  tyntecBaseUrl: string;
  projectId: string;
}

export interface MessageRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    event: 'MoMessage',
    channel: 'whatsapp' | 'sms' | 'tyntecEcho';
    receivedAt?: Date;
    timestamp?: Date;
    messageId: string;
    from: string;
    to: string;
    groupId?: string;
    content: {
      contentType: 'text' | 'url' | 'media' | 'location';
      text?: string;
      url?: string;
      media?: {
        type?: 'image' | 'document' | 'audio' | 'voice' | 'video';
        url?: string;
        mediaId?: string;
        caption?: string;
      };
      location?: {
        longitude: number;
        latitude: number;
        name?: string;
        address?: string;
      }
    };
    context?: {
      messageId?: string;
    };
    sms?: {
      origin?: {
        mcc?: string;
        mnc?: string;
        ttId?: string;
      };
      totalPrice?: number;
      size?: number;
      missingParts?: boolean;
      parts?: {
        messageId?: string;
        sentDate?: string;
        price?: number;
        currency?: string;
        priceEffective?: string;
        sequenceNumber?: number;
      }[];
    };
    whatsapp?: {
      senderName?: string;
    };
  };
}

export interface DialogflowResponse {
  responseId: string;
  queryResult: {
    fulfillmentMessages: {
      platform: string;
      text: { text: string[] };
      message: string;
    }[];
    outputContexts: any[];
    queryText: string;
    speechRecognitionConfidence: number;
    action: string;
    parameters: { fields: Record<string, { stringValue: string }> };
    allRequiredParamsPresent: boolean,
    fulfillmentText: string;
    webhookSource: string;
    webhookPayload: any;
    intent: {
      inputContextNames: any[];
      events: any;
      trainingPhrases: any;
      outputContexts: any;
      parameters: any;
      messages: any;
      defaultResponsePlatforms: any;
      followupIntentInfo: any;
      name: string;
      displayName: string;
      priority: number;
      isFallback: boolean;
      webhookState: string;
      action: string;
      resetContexts: string;
      rootFollowupIntentName: string;
      parentFollowupIntentName: string;
      mlDisabled: boolean;
    };
    intentDetectionConfidence: number;
    diagnosticInfo: any;
    languageCode: string;
    sentimentAnalysisResult: any;
  },
  webhookStatus: any;
  outputAudio: any;
  outputAudioConfig: any;
}

export interface ProductMock {
  category: 'shoes' | 'hats' | 'shirts';
  name: string;
  picture: string;
  sizes: string[];
  colors: string[];
  price: number;
}

export interface MessageResponse {
  text: string;
  pictures?: {
    type: 'image' | 'document' | 'video' | 'audio';
    url: string;
    caption: string;
  }[];
}
