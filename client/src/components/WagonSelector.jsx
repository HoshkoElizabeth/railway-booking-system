function WagonSelector({ wagons, selectedWagon, onSelect }) {
    return (
        <div>
            <h3>Оберіть вагон:</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {wagons.map((wagon) => (
                    <button
                        key={wagon.id}
                        onClick={() => onSelect(wagon)}
                        style={{
                            padding: "10px 16px",
                            border: "2px solid",
                            borderColor: selectedWagon?.id === wagon.id ? "#1565c0" : "#ccc",
                            borderRadius: "8px",
                            background: selectedWagon?.id === wagon.id ? "#1565c0" : "white",
                            color: selectedWagon?.id === wagon.id ? "white" : "#333",
                            cursor: "pointer",
                        }}
                    >
                        Вагон {wagon.number} · {wagon.type} · {wagon.totalSeats - wagon.bookedSeats.length} місць
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WagonSelector;