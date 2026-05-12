import styles from "./SeatMap.module.css";

function SeatMap({ wagon, selectedSeats, onToggle }) {
    if (!wagon) return null;

    const seats = Array.from({ length: wagon.totalSeats }, (_, i) => i + 1);

    const getStatus = (seat) => {
        if (wagon.bookedSeats.includes(seat)) return "booked";
        if (selectedSeats.includes(seat)) return "selected";
        return "free";
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Місця — Вагон {wagon.number} ({wagon.type})</h3>

            <div className={styles.legend}>
                <span className={`${styles.dot} ${styles.free}`}>Вільне</span>
                <span className={`${styles.dot} ${styles.selected}`}>Обране</span>
                <span className={`${styles.dot} ${styles.booked}`}>Заброньоване</span>
            </div>

            <div className={styles.grid}>
                {seats.map((seat) => {
                    const status = getStatus(seat);
                    return (
                        <button
                            key={seat}
                            disabled={status === "booked"}
                            onClick={() => onToggle(seat)}
                            className={`${styles.seat} ${styles[status]}`}
                        >
                            {seat}
                        </button>
                    );
                })}
            </div>

            {selectedSeats.length > 0 && (
                <p className={styles.info}>
                    Обрані: <strong>{[...selectedSeats].sort((a, b) => a - b).join(", ")}</strong>
                </p>
            )}
        </div>
    );
}

export default SeatMap;