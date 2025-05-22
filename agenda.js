const Agenda = require('agenda');
const Message = require('./models/message');
const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'jobs' },
  processEvery: '30 seconds',
});
agenda.define('send message', async (job) => {
try {
  const { message, scheduledFor } = job.attrs.data;
    await Message.create({ text: message, scheduledFor });
  } catch (error) {
    console.error('Error saving message:', error);
  }
});
(async function () {
  await agenda.start();
})();

module.exports = agenda;
