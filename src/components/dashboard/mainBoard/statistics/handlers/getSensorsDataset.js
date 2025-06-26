import { ref, get, child, getDatabase } from "firebase/database";
import { app } from "../../../../../../firebaseConfig";

export async function getSensorsDataset() {
  const database = getDatabase(app);

  const dbRef = ref(database);

  try {
    const snapshot = await get(child(dbRef, "sensors"));
    if (!snapshot.exists()) return { labels: [], datasets: [] };

    const registros = Object.values(snapshot.val());

    // Ordena por timestamp (opcional pero recomendable)
    registros.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const labels = registros.map((r) => {
      const hora = new Date(r.timestamp);
      return hora.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    });

    const humedad = registros.map((r) => r.humedad);
    const temperatura = registros.map((r) => r.temperatura);
    const luminosidad = registros.map((r) => r.luminosidad);

    const datasets = [
      {
        label: "Humedad (%)",
        data: humedad,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Temperatura (°C)",
        data: temperatura,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Luminosidad (lux)",
        data: luminosidad,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
        yAxisID: "luxAxis",
      },
    ];

    return { labels, datasets };
  } catch (error) {
    console.error("Error al obtener datos de sensores:", error);
    return { labels: [], datasets: [] };
  }
}
