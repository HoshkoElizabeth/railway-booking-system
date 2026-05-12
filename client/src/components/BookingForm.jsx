import { useState } from "react";
import styles from "./BookingForm.module.css";

function BookingForm({ train, wagon, seats, onSubmit }) {
    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    const [errors, setErrors] = useState({});

    if (!seats.length) {
        return <p className={styles.hint}>👆 Спочатку оберіть місця</p>;
    }

    const validate = () => {
        const e = {};
        if (form.name.trim().length < 2) e.name = "Введіть ім'я";
        if (!/^\+?[\d\s\-()]{10,15}$/.test(form.phone)) e.phone = "Невірний телефон";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Невірний email";
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        onSubmit(form);
        setForm({ name: "", phone: "", email: "" });
        setErrors({});
    };

    const field = (id, label, type, placeholder) => (
        <div key={id} className={styles.field}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id} name={id} type={type}
                value={form[id]} placeholder={placeholder}
                className={errors[id] ? styles.inputErr : ""}
                onChange={(e) => {
                    setForm((p) => ({ ...p, [id]: e.target.value }));
                    setErrors((p) => ({ ...p, [id]: "" }));
                }}
            />
            {errors[id] && <span className={styles.err}>{errors[id]}</span>}
        </div>
    );

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Форма бронювання</h3>

            <div className={styles.summary}>
                <p><strong>Рейс:</strong> №{train.number} ({train.from} → {train.to})</p>
                <p><strong>Вагон:</strong> {wagon.number} ({wagon.type})</p>
                <p><strong>Місця:</strong> {[...seats].sort((a, b) => a - b).join(", ")}</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className={styles.form}>
                {field("name", "Ім'я та прізвище", "text", "Іван Іваненко")}
                {field("phone", "Телефон", "tel", "+380 XX XXX XX XX")}
                {field("email", "Email", "email", "example@email.com")}
                <button type="submit" className={styles.btn}>
                    ✅ Підтвердити бронювання
                </button>
            </form>
        </div>
    );
}

export default BookingForm;