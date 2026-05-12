const express = require("express");
const cors = require("cors");
const { trains } = require("./data/trains");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// зберігаємо бронювання в пам'яті
let bookings = [];

// GET /api/trains — список всіх рейсів
app.get("/api/trains", (req, res) => {
    const { search } = req.query;
    if (search) {
        const q = search.toLowerCase();
        return res.json(
            trains.filter(
                (t) =>
                    t.number.toLowerCase().includes(q) ||
                    t.from.toLowerCase().includes(q) ||
                    t.to.toLowerCase().includes(q)
            )
        );
    }
    res.json(trains);
});

// GET /api/trains/:id — один рейс
app.get("/api/trains/:id", (req, res) => {
    const train = trains.find((t) => t.id === req.params.id);
    if (!train) return res.status(404).json({ error: "Рейс не знайдено" });
    res.json(train);
});

// GET /api/bookings/seats?trainId=1&wagonId=w1 — заброньовані місця
app.get("/api/bookings/seats", (req, res) => {
    const { trainId, wagonId } = req.query;
    const seats = bookings
        .filter((b) => b.trainId === trainId && b.wagonId === wagonId)
        .flatMap((b) => b.seats);
    res.json({ bookedSeats: [...new Set(seats)] });
});

// POST /api/bookings — створити бронювання
app.post("/api/bookings", (req, res) => {
    const { trainId, wagonId, seats, passenger } = req.body;

    if (!trainId || !wagonId || !seats || !passenger) {
        return res.status(400).json({ error: "Не всі поля заповнені" });
    }

    // перевірка конфліктів
    const alreadyBooked = bookings
        .filter((b) => b.trainId === trainId && b.wagonId === wagonId)
        .flatMap((b) => b.seats);

    const conflicts = seats.filter((s) => alreadyBooked.includes(s));
    if (conflicts.length > 0) {
        return res.status(409).json({ error: "Місця вже зайняті", seats: conflicts });
    }

    const newBooking = {
        id: `b_${Date.now()}`,
        trainId, wagonId, seats, passenger,
        createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});