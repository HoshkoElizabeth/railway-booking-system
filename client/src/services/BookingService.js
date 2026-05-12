const KEY = "railway_bookings";

export const BookingService = {
    getAll() {
        try { return JSON.parse(localStorage.getItem(KEY)) || []; }
        catch { return []; }
    },
    save(booking) {
        const all = this.getAll();
        const item = { ...booking, id: `b_${Date.now()}`, createdAt: new Date().toISOString() };
        localStorage.setItem(KEY, JSON.stringify([...all, item]));
        return item;
    },
    getBookedSeats(trainId, wagonId) {
        return this.getAll()
            .filter(b => b.trainId === trainId && b.wagonId === wagonId)
            .flatMap(b => b.seats);
    },
};