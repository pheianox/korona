import { CovidCountryHistory } from "../types";
import { Line } from "react-chartjs-2";

interface Props {
  history: CovidCountryHistory;
}

export const StatBar: React.FC<Props> = (props) => {
  const entries = Object.entries(props.history.timeline.cases);
  const labels = entries.map(([k, v]) => k.replaceAll("/", "-"));
  const cases = entries.map(([k, v]) => v);
  console.log(entries);
  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              text: "Last two weeks",
              display: true,
            },
            ticks: {
              padding: 0,
            },
          },
          y: {
            title: {
              text: "Total cases",
              display: true,
            },
            ticks: {
              display: false,
              padding: 0,
            },
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: "Cases",
            data: cases,
            fill: true,
            borderColor: "hsl(var(--bc))",
            pointBackgroundColor: "hsl(var(--bc))",
            pointBorderColor: "transparent",
            tension: 0.1,
            pointRadius: 5,
            pointHoverRadius: 10,
          },
        ],
      }}
    />
  );
};
