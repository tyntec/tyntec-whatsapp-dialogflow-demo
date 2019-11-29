import * as express from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import * as dialogflow from 'dialogflow';
import { messageSchema } from './schemas';
import { sendWhatsappTextMessage, sendWhatsappImage } from './tyntec';
import { readFileSync } from 'fs';
import { Config, MessageRequestSchema, DialogflowResponse, MessageResponse } from './types';
import { trendsHandler } from './trendsIntent';
import { availabilityHandler } from './availabilityIntent';
import { priceHandler } from './priceIntent';

export const config: Config = JSON.parse(readFileSync('./config.json').toString());

const app = express();

const messageHandler = async (req: ValidatedRequest<MessageRequestSchema>, res: express.Response) => {
  try {
    const projectId = config.projectId;
    const sessionId = req.body.from;
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.content.text,
          languageCode: 'en-US',
        },
      },
    };

    const result = await sessionClient.detectIntent(request) as DialogflowResponse[];
    console.log(`Result: ${require('util').inspect(result, false, 15)}`);
    let response: MessageResponse;

    switch (result[0].queryResult.action) {
      case 'fashion.trends':
        response = trendsHandler(result[0]);
        break;

      case 'product.availability':
        response = availabilityHandler(result[0]);
        break;

      case 'product.price':
        response = priceHandler(result[0]);
        break;

      default:
        response = {
          text: result[0].queryResult.fulfillmentText,
        };

    }

    if (config.debug) {
      console.log(require('util').inspect(response, false, 15));
    } else {
      await sendWhatsappTextMessage({
        from: req.body.to,
        to: req.body.from,
        text: response.text,
      });
      if (response.pictures) {
        for (const picture of response.pictures) {
          await sendWhatsappImage({
            from: req.body.to,
            to: req.body.from,
            media: picture,
          });
        }
      }
    }

    res.status(204).send();

  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

const validator = createValidator();

app.use(express.json());
app.post('/callback/message', validator.body(messageSchema), messageHandler);
app.listen(config.port, () => console.log(`Server listening on port ${config.port}.`));
