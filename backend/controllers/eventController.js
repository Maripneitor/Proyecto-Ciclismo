const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    const event = await Event.create({ name, description, date, location });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
};