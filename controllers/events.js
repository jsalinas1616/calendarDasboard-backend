const { response } = require('express');
const Event = require('../models/Events');

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate('user', 'name');
    res.status(201).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const addEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    // envio al schema, el  event, al objeto user el id
    //esto esta padre por que mando al esquema el id del cual estoy logeado
    event.user = req.uid;

    const eventSave = await event.save();
    res.json({
      ok: true,
      event: eventSave,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const userUid = req.uid;

  // console.log(event.user.toString());

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'el evento no existe por ese Id',
      });
    }

    if (event.user.toString() !== userUid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene privilegios de editar esta tarea',
      });
    }

    const newEvent = {
      ...req.body,
      user: userUid,
    };

    const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    //new:true para que me mande los datos actualizados que acabo de actualizar
    res.status(201).json({
      ok: true,
      msg: 'eventUpdate',
      eventId,
      eventUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mgs: 'Hable con el administrador',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const userUid = req.uid;

  console.log(eventId);

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'el evento no existe por ese Id',
      });
    }

    if (event.user.toString() !== userUid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene privilegios de editar esta tarea',
      });
    }

    //aca lo borra
    const deleted = await Event.findByIdAndDelete(eventId);

    res.status(201).json({
      ok: true,
      msg: 'deleteEvent',
      deleted,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
