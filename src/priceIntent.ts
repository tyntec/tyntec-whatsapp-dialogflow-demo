import { MessageResponse, DialogflowResponse } from './types';
import { products } from './mocks';

export const priceHandler = (response: DialogflowResponse): MessageResponse => {
  if (response.queryResult.allRequiredParamsPresent) {
    const price = products.find(product => (
      product.name.toLowerCase() === response.queryResult.parameters.fields.product.stringValue
    )).price;
    return {
      text: response.queryResult.fulfillmentText.replace('$price', price.toString()),
    }
  } else {
    return {
      text: response.queryResult.fulfillmentText,
    };
  }
};


