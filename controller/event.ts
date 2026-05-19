import { Request, Response } from "express";
import { Event } from "../model/event";

class EventController { 
    createEvent = async (req: Request, res: Response) => {
        let params = req.body;

        const nuevoEvento = new Event(params);

        try {
            await nuevoEvento.save().then((eventoData) => {
                if (eventoData) {
                    return res.status(201).send({
                        status: "success",
                        message: "El evento se ha creado correctamente ✅",
                        data: eventoData
                    });
                }

                return res.status(400).send({
                    status: "error",
                    message: "Lo siento, no pudimos crear el evento ❌"
                });
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al crear el evento ❌",
                error: error
            });
        }
    }

    getEvents = async (req: Request, res: Response) => {
        try {
            const eventos = await Event.find();

            if (eventos && eventos.length > 0) {
                return res.status(200).send({
                    status: "success",
                    message: "Eventos obtenidos correctamente ✅",
                    data: eventos
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron eventos ❌"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener los eventos ❌",
                error: error
            });
        }
    }

    getEventById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const evento = await Event.findById(id);

            if (evento) {
                return res.status(200).send({
                    status: "success",
                    message: "Evento obtenido correctamente ✅",
                    data: evento
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "El evento no fue encontrado ❌"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener el evento ❌",
                error: error
            });
        }
    }

    updateEvent = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const params = req.body;

            const eventoActualizado = await Event.findByIdAndUpdate(id, params, { new: true });

            if (eventoActualizado) {
                return res.status(200).send({
                    status: "success",
                    message: "El evento se ha actualizado correctamente ✅",
                    data: eventoActualizado
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "El evento no fue encontrado ❌"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar el evento ❌",
                error: error
            });
        }
    }

    deleteEvent = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const resultado = await Event.findByIdAndDelete(id);

            if (resultado) {
                return res.status(200).send({
                    status: "success",
                    message: "El evento se ha eliminado correctamente ✅",
                    data: resultado
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "El evento no fue encontrado ❌"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al eliminar el evento ❌",
                error: error
            });
        }
    }

    deleteAllEvents = async (req: Request, res: Response) => {
        try {
            const resultado = await Event.deleteMany({});

            if (resultado.deletedCount && resultado.deletedCount > 0) {
                return res.status(200).send({
                    status: "success",
                    message: `Se eliminaron ${resultado.deletedCount} eventos correctamente ✅`,
                    data: { deletedCount: resultado.deletedCount }
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No hay eventos para eliminar ❌"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al eliminar los eventos ❌",
                error: error
            });
        }
    }
}

export default new EventController();