import { AuthenticatedRequest } from "@/middlewares";
import { bookingServices } from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";




export function getBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const test = bookingServices.getUserBooking(userId)
    console.log(req)
    res.status(httpStatus.OK).send(test);
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body
    const booking = await bookingServices.postUserBooking(userId, roomId)
    res.status(httpStatus.OK).send({ bookingId: booking.id });
}

export async function editBookingById(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { bookingId } = req.params
    const {roomId} = req.body
    const newBooking = await bookingServices.editBooking(userId, roomId)
    res.status(httpStatus.OK).send(newBooking.id);
}