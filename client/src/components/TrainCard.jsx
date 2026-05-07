import { useNavigate } from "react-router-dom";
import styles from "./TrainCard.module.css";

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h} год ${m > 0 ? m + " хв" : ""}`;
}

function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function TrainCard({ train }) {
    const navigate = useNavigate();

    const availableSeats = train.wagons.reduce((total, wagon) => {
        return total + (wagon.totalSeats - wagon.bookedSeats.length);
    }, 0);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.trainNumber}>Потяг №{train.number}</span>
                <span className={styles.seats}>{availableSeats} місць вільно</span>
            </div>

            <div className={styles.route}>
                <div className={styles.city}>
                    <span className={styles.cityName}>{train.from}</span>
                    <span className={styles.time}>{formatDateTime(train.departureTime)}</span>
                </div>

                <div className={styles.arrow}>
                    <span className={styles.duration}>{formatDuration(train.durationMinutes)}</span>
                    <div className={styles.line}></div>
                    <span className={styles.arrowIcon}>→</span>
                </div>

                <div className={styles.city}>
                    <span className={styles.cityName}>{train.to}</span>
                    <span className={styles.time}>{formatDateTime(train.arrivalTime)}</span>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.wagonTypes}>
                    {train.wagons.map((w) => (
                        <span key={w.id} className={styles.wagonBadge}>
                            {w.type}
                        </span>
                    ))}
                </div>
                <button
                    className={styles.bookBtn}
                    onClick={() => navigate(`/booking/${train.id}`)}
                >
                    Обрати місця
                </button>
            </div>
        </div>
    );
}

export default TrainCard;