/*
    ROUTES from CRUD /evnets
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { fieldValidate } = require('../middlewares/fieldsValidate');

//import helper, for custom check form express
const { isDate } = require('../helpers/isDate');

const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const { validateJWT } = require('../middlewares/revalidar-jwt');

router.use(validateJWT);

// get Events
router.get('/', getEvents);

//add event
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    fieldValidate,
  ],
  addEvent
);

//update event
router.put('/:id', updateEvent);

//delete event
router.delete('/:id', deleteEvent);

module.exports = router;
