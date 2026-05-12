function SeatMap({ wagon, selectedSeats, onToggle }) {
    if (!wagon) return null;

    const seats = Array.from({ length: wagon.totalSeats }, (_, i) => i + 1);

    const getColor = (seat) => {
        if (wagon.bookedSeats.includes(seat)) return "#ffcdd2";
        if (selectedSeats.includes(seat)) return "#1565c0";
        return "#c8e6c9";
    };

    const getTextColor = (seat) => {
        if (selectedSeats.includes(seat)) return "white";
        return "#333";
    };

    return (
        <div>
            <h3>Місця — Вагон {wagon.number} ({wagon.type})</h3>

            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <span style={{ background: "#c8e6c9", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem" }}>Вільне</span>
                <span style={{ background: "#1565c0", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem" }}>Обране</span>
                <span style={{ background: "#ffcdd2", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem" }}>Заброньоване</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 42px)", gap: "8px" }}>
                {seats.map((seat) => (
                    <button
                        key={seat}
                        disabled={wagon.bookedSeats.includes(seat)}
                        onClick={() => onToggle(seat)}
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "6px",
                            border: "none",
                            background: getColor(seat),
                            color: getTextColor(seat),
                            fontWeight: "600",
                            fontSize: "0.8rem",
                            cursor: wagon.bookedSeats.includes(seat) ? "not-allowed" : "pointer",
                        }}
                    >
                        {seat}
                    </button>
                ))}
            </div>

            {selectedSeats.length > 0 && (
                <p style={{ marginTop: "12px", color: "#1565c0" }}>
                    Обрані: <strong>{[...selectedSeats].sort((a, b) => a - b).join(", ")}</strong>
                </p>
            )}
        </div>
    );
}

export default SeatMap;