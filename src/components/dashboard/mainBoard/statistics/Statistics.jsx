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

export default function Statistics({ periodo, labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Gastos',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Gastos por ${periodo === 'mes' ? 'mes' : 'últimas 4 semanas'}`,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
