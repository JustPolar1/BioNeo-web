import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics({ periodo, labels, valuesVentas, valuesCompras }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: valuesVentas,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderRadius: 6,
      },
      {
        label: 'Compras',
        data: valuesCompras,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Gastos por ${periodo === 'mes' ? 'mes' : 'últimas 4 semanas'}`,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: function(value) {
            return Math.abs(value); // Muestra valores positivos en el eje
          }
        }
      },
      y: { stacked: true }
    }
  };

  return <Bar data={data} options={options} />;
}