import axios from 'axios';
import { config } from '.';

export const sendWhatsappTextMessage = async (params: { from: string, to: string, text: string }) => {
  const request = {
    to: params.to,
    channels: ['whatsapp'],
    whatsapp: {
      from: params.from,
      contentType: 'text',
      text: params.text,
    },
  };

  return axios.post(`${config.tyntecBaseUrl}/messages`, request, { headers: { apikey: config.tyntecApikey } });
}

export const sendWhatsappImage = async (params: { from: string, to: string, media: any }) => {
  const request = {
    to: params.to,
    channels: ['whatsapp'],
    whatsapp: {
      from: params.from,
      contentType: 'media',
      media: params.media,
    },
  };

  return axios.post(`${config.tyntecBaseUrl}/messages`, request, { headers: { apikey: config.tyntecApikey } });
}
