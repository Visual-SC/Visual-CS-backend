import { Router } from 'express';
import eventController from '../controller/event';

const EventRouter = Router();


EventRouter.post('/create-event', eventController.createEvent);
EventRouter.get('/get-events', eventController.getEvents);
EventRouter.get('/get-event/:id', eventController.getEventById);
EventRouter.put('/update-event/:id', eventController.updateEvent);
EventRouter.delete('/delete-event/:id', eventController.deleteEvent);
EventRouter.delete('/delete-all-events', eventController.deleteAllEvents);

export default EventRouter;