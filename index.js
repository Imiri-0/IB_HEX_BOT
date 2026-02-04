import connectToWhatsapp from './Digix/crew.js';
import handleIncomingMessage from './events/messageHandler.js';

(async () => {
  await connectToWhatsapp(handleIncomingMessage);
  console.log('✅ WhatsApp connection established from index.js!');
})();
