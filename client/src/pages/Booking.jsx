import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import { BookingService } from "../services/BookingService";
import styles from "./Booking.module.css";
import { ApiService } from "../services/ApiService";

function Booking() {
    const { trainId } = useParams();
    const navigate = useNavigate();
    
    const [train, setTrain] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedWagon, setSelectedWagon] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [extraBooked, setExtraBooked] = useState([]);

    // Завантаження даних про рейс
    useEffect(() => {
        setLoading(true);
        ApiService.getTrain(trainId)
            .then((data) => {
                if (data.error) {
                    setTrain(null);
                } else {
                    setTrain(data);
                }
            })
            .catch(() => setTrain(null))
            .finally(() => setLoading(false));
    }, [trainId]);

    // useEffect — брати заброньовані місця з API
    useEffect(() => {
        if (selectedWagon) {
            ApiService.getBookedSeats(trainId, selectedWagon.id)
                .then(setExtraBooked);
            setSelectedSeats([]);
        }
    }, [selectedWagon, trainId]);

    if (loading) {
        return <div className={styles.page}><p style={{ padding: "40px", textAlign: "center" }}>Завантаження...</p></div>;
    }

    if (!train) {
        return (
            <div className={styles.notFound}>
                <p>Рейс не знайдено</p>
                <button onClick={() => navigate("/")}>← Назад</button>
            </div>
        );
    }

    const handleToggle = (seat) =>
        setSelectedSeats((prev) =>
            prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
        );

    // handleBooking — зберігати через API
    const handleBooking = async (formData) => {
        const result = await ApiService.createBooking({
            trainId,
            wagonId: selectedWagon.id,
            seats: selectedSeats,
            passenger: formData,
        });

        if (result.error) {
            alert(`Помилка: ${result.error}`);
            return;
        }

        setExtraBooked((prev) => [...prev, ...selectedSeats]);
        alert(`Місця ${[...selectedSeats].sort((a, b) => a - b).join(", ")} у вагоні ${selectedWagon.number} заброньовано!`);
        setSelectedSeats([]);
    };

    const wagonView = selectedWagon
        ? { ...selectedWagon, bookedSeats: [...new Set([...selectedWagon.bookedSeats, ...extraBooked])] }
        : null;

    return (
        <div className={styles.page}>

            <div className={styles.header}>
                <button className={styles.back} onClick={() => navigate("/")}>← Назад</button>
                <div>
                    <h1 className={styles.title}>Потяг №{train.number}: {train.from} → {train.to}</h1>
                    <p className={styles.sub}>Оберіть вагон та місця</p>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.left}>
                    <WagonSelector wagons={train.wagons} selectedWagon={selectedWagon} onSelect={setSelectedWagon} />
                    {wagonView && <SeatMap wagon={wagonView} selectedSeats={selectedSeats} onToggle={handleToggle} />}
                </div>
                <div className={styles.right}>
                    <BookingForm train={train} wagon={selectedWagon} seats={selectedSeats} onSubmit={handleBooking} />
                </div>
            </div>

        </div>
    );
}

export default Booking;