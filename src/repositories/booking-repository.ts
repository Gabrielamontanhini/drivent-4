import { prisma } from "@/config";

async function findBooking(userId: number) {
    return await prisma.booking.findFirst({
        where: { userId },
        include: { Room: true },
      });
    }


async function insertBooking(roomId: number, userId: number) {
    return await prisma.booking.create({
        data: {
          roomId,
          userId,
        },
      });
}


async function editBooking(bookingId: number, roomId: number) {
    return await prisma.booking.update({
        data: { roomId },
        where: { id: bookingId },
      });
}

async function getRoomById(roomId: number) {
    return prisma.room.findFirst({
      where: { id: roomId },
    });
  }


export const bookingRepository = {findBooking, insertBooking , editBooking , getRoomById}