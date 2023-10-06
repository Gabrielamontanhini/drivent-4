import { getBooking } from "@/controllers";
import { Router } from "express";

const bookingRouter = Router()

bookingRouter
    .get('/', getBooking)
    .post('/')
    .put('/bookingId')

export { bookingRouter };