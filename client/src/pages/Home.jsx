import TrainList from "../components/TrainList";
import { trains } from "../data/trains";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logo}>🚄 УкрЗалізниця</div>
                <p className={styles.subtitle}>Онлайн-бронювання залізничних квитків</p>
            </header>
            <main className={styles.main}>
                <h2 className={styles.sectionTitle}>Доступні рейси</h2>
                <TrainList trains={trains} />
            </main>
        </div>
    );
}

export default Home;