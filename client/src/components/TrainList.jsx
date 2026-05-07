import { useState } from "react";
import TrainCard from "./TrainCard";
import styles from "./TrainList.module.css";

function TrainList({ trains }) {
    const [search, setSearch] = useState("");

    const filtered = trains.filter((train) => {
        const query = search.toLowerCase();
        return (
            train.number.toLowerCase().includes(query) ||
            train.from.toLowerCase().includes(query) ||
            train.to.toLowerCase().includes(query)
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Пошук за номером, містом відправлення або прибуття..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            {filtered.length === 0 ? (
                <div className={styles.noResults}>
                    <p>Рейсів не знайдено. Спробуйте інший запит.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filtered.map((train) => (
                        <TrainCard key={train.id} train={train} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TrainList;