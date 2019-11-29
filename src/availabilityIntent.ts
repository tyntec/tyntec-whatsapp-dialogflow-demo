import { MessageResponse, DialogflowResponse } from './types';
import { products } from './mocks';

export const availabilityHandler = (response: DialogflowResponse): MessageResponse => {
  if (response.queryResult.allRequiredParamsPresent) {
    const availability = products.find(product => (
      product.sizes.includes(response.queryResult.parameters.fields.product.stringValue) &&
      product.colors.includes(response.queryResult.parameters.fields.size.stringValue) &&
      product.name.toLowerCase() === response.queryResult.parameters.fields.product.stringValue
    )) ? 'available! Yay!' : 'not available, sorry';
    return {
      text: response.queryResult.fulfillmentText.replace('$availability', availability),
    }
  } else {
    return {
      text: response.queryResult.fulfillmentText,
    };
  }
};

