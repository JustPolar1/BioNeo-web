import { ref, get, child, getDatabase } from "firebase/database";
import { app } from "../../../../../../firebaseConfig";

export async function getSensorsDataset() {
  const database = getDatabase(app);

  const dbRef = ref(database);

  try {
    const snapshot = await get(child(dbRef, "sensors"));
    if (!snapshot.exists()) return { labels: [], datasets: [] };

    const registros = Object.values(snapshot.val());

    // Filtrar solo los registros de las últimas 24 horas
    const ahora = Date.now();
    const hace24h = ahora - 24 * 60 * 60 * 1000;
    const registros24h = registros.filter(r => {
      const t = new Date(r.timestamp).getTime();
      return t >= hace24h && t <= ahora;
    });

    // Ordena por timestamp (opcional pero recomendable)
    registros24h.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const labels = registros24h.map((r) => {
      const hora = new Date(r.timestamp);
      return hora.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    });

    const humedad = registros24h.map((r) => r.humedad);
    const temperatura = registros24h.map((r) => r.temperatura);
    const luminosidad = registros24h.map((r) => r.luminosidad);
    const humedadSuelo = registros24h.map((r) => r.humedad_suelo); // <-- Nuevo

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
      {
        label: "Humedad del suelo (%)", // <-- Nuevo dataset
        data: humedadSuelo,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ];

    return { labels, datasets };
  } catch (error) {
    console.error("Error al obtener datos de sensores:", error);
    return { labels: [], datasets: [] };
  }
}