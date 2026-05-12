import styles from "./WagonSelector.module.css";

function WagonSelector({ wagons, selectedWagon, onSelect }) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Оберіть вагон:</h3>
            <div className={styles.list}>
                {wagons.map((wagon) => (
                    <button
                        key={wagon.id}
                        onClick={() => onSelect(wagon)}
                        className={`${styles.btn} ${selectedWagon?.id === wagon.id ? styles.active : ""}`}
                    >
                        Вагон {wagon.number} · {wagon.type} · {wagon.totalSeats - wagon.bookedSeats.length} місць
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WagonSelector;