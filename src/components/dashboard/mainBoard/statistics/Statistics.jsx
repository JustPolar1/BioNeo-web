import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics({ periodo }) {

  let labels, dataValues;

  if (periodo === 'mes') {
    labels = ['Enero', 'Febrero', 'Marzo', 'Abril'];
    dataValues = [150, 200, 180, 220];
  } else {
    // Últimas 4 semanas
    labels = ['Semana 4', 'Semana 3', 'Semana 2', 'Semana 1'];  
    dataValues = [90, 120, 80, 100]; 
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Gastos',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Gastos por ${periodo === 'mes' ? 'mes' : 'últimas 4 semanas'}` },
    },
  };

  return <Bar data={data} options={options} />;
}
