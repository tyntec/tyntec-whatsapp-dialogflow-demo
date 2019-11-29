import { MessageResponse, DialogflowResponse } from './types';
import { products } from './mocks';

export const trendsHandler = (response: DialogflowResponse): MessageResponse => {
  if (response.queryResult.allRequiredParamsPresent) {
    return {
      text: response.queryResult.fulfillmentText,
      pictures: products
        .filter(product => product.category === response.queryResult.parameters.fields.Category.stringValue)
        .map(product => ({
          caption: product.name,
          type: 'image',
          url: product.picture,
        })),
    }
  } else {
    return {
      text: response.queryResult.fulfillmentText,
    };
  }
};
