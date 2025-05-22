const express = require('express');
require('dotenv').config();
require('./db');
const os = require('os');
const excelSheetRoutes = require('./routes/excelSheetRoutes');
const app = express();
const agenda = require('./agenda');
app.use(express.json());
app.get('/get',(req,res)=>{
    res.send("hello world")
})
app.post('/api/schedule-message', async (req, res) => {
    try {
      const { message, day, time } = req.body;
      /*
      Body:
      {
          "message": "String",
          "day": "YYYY-MM-DD",
          "time": "HH:MM:SS"(08:33:00 in 24 Hours Format)
      }
      */ 
      if (!message || !day || !time) {
        return res.status(400).json({ error: 'Please provide message, day and time' });
      }
  
      const scheduledDate = new Date(`${day}T${time}`);
      if (isNaN(scheduledDate.getTime()) || scheduledDate < new Date()) {
        return res.status(400).json({ error: 'Invalid or past date/time provided' });
      }
  
      const existingJobs = await agenda.jobs({
        name: process.env.JOB_NAME,
        'data.message': message,
        'data.scheduledFor': scheduledDate
      });
      if (existingJobs.length > 0) {
        return res.status(409).json({ error: 'Duplicate job already scheduled' });
      }
      await agenda.schedule(scheduledDate, process.env.JOB_NAME, { message, scheduledFor: scheduledDate });
      res.json({ message: 'Message scheduled successfully', scheduledDate });
    } catch (err) {
      res.status(500).json({ error: 'Failed to schedule message', details: err.message });
    }
  });
app.use('/api', excelSheetRoutes);
app.listen(3000, () => console.log('Server started on port 3000'));

setInterval(() => {
    const cpus = os.cpus();
    let idle = 0;
    let total = 0;
    cpus.forEach((core) => {
      for (let type in core.times) {
        total += core.times[type];
      }
      idle += core.times.idle;
    });
    const idleAvg = idle / cpus.length;
    const totalAvg = total / cpus.length;
    const usage = 100 - Math.floor((idleAvg / totalAvg) * 100);
    if (usage > 70) {
      process.exit(1);
    }
  }, 5000);


