const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const ApiService = {
    async getTrains(search = "") {
        const url = search ? `${BASE}/trains?search=${search}` : `${BASE}/trains`;
        const res = await fetch(url);
        return res.json();
    },

    async getTrain(id) {
        const res = await fetch(`${BASE}/trains/${id}`);
        return res.json();
    },

    async getBookedSeats(trainId, wagonId) {
        const res = await fetch(`${BASE}/bookings/seats?trainId=${trainId}&wagonId=${wagonId}`);
        const data = await res.json();
        return data.bookedSeats;
    },

    async createBooking(booking) {
        const res = await fetch(`${BASE}/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking),
        });
        return res.json();
    },
};