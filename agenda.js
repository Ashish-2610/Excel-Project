const Agenda = require('agenda');
const Message = require('./models/message');
const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'jobs' },
  processEvery: '5 seconds',
});
agenda.define(process.env.JOB_NAME, async (job) => {
try {
  const { message, scheduledFor } = job.attrs.data;
    await Message.create({ text: message, scheduledFor });
  } catch (error) {
    console.error('Error saving message:', error);
  }
});
(async function () {
try {
  await agenda.start();
} catch (err) {
  console.error('Failed to start', err);
}
})();

module.exports = agenda;
