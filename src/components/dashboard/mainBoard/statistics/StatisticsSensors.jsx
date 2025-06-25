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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsSensors({ labels, datasets }) {
  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Condiciones de la planta durante el día',
      },
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
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}
