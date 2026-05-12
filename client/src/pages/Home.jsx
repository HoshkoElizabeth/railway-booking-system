import { useState, useEffect } from "react";
import TrainList from "../components/TrainList";
import { ApiService } from "../services/ApiService";
import styles from "./Home.module.css";

function Home() {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ApiService.getTrains()
            .then(setTrains)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logo}>🚄 УкрЗалізниця</div>
                <p className={styles.subtitle}>Онлайн-бронювання залізничних квитків</p>
            </header>
            <main className={styles.main}>
                <h2 className={styles.sectionTitle}>Доступні рейси</h2>
                {loading ? (
                    <p>Завантаження...</p>
                ) : (
                    <TrainList trains={trains} />
                )}
            </main>
        </div>
    );
}

export default Home;