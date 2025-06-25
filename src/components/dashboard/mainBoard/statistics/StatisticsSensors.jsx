import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los módulos necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsSensors() {
  const labels = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Humedad (%)',
        data: [60, 55, 50, 48, 52, 58],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Temperatura (°C)',
        data: [18, 21, 27, 30, 26, 22],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Luminosidad (lux)',
        data: [100, 500, 800, 700, 400, 100],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
        yAxisID: 'luxAxis', // Eje secundario si es necesario
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Condiciones de la planta durante el día' },
    },
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        position: 'left',
        title: { display: true, text: 'Humedad / Temperatura' },
      },
      luxAxis: {
        type: 'linear',
        beginAtZero: true,
        position: 'right',
        title: { display: true, text: 'Luminosidad (lux)' },
        grid: { drawOnChartArea: false }, // evita duplicar líneas de fondo
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}
