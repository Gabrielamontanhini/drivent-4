import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import { enrollmentRepository, ticketsRepository } from "@/repositories";
import { bookingRepository } from "@/repositories/booking-repository"

 async function getUserBooking(userId: number){
    const userBooking = await bookingRepository.findBooking(userId);
    if (!userBooking) throw notFoundError();
    return userBooking;
}

async function postUserBooking(userId: number, roomId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();
    const ticketType = await ticketsRepository.findTicketById(ticket.id);
    if (ticket.status !== 'PAID' || ticketType.TicketType.isRemote || !ticketType.TicketType.includesHotel) {
        throw cannotListHotelsError(); //TODO adaptar 
      }
  //TODO  const room = await getRoomById(roomId);
    const booking = await bookingRepository.insertBooking(roomId, userId)
    return booking

}

async function editBooking(userId: number, roomId: number){
    const booking = await getUserBooking(userId)
    const room = await bookingRepository.getRoomById(roomId)
    return await bookingRepository.editBooking(userId, roomId)
}


export const bookingServices = {
    getUserBooking, postUserBooking, editBooking
}