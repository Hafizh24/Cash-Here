import { Chart } from 'react-google-charts'

export const data = [
  ['Hour', 'Sales'],
  ['08.00', 1000],
  ['09.00', 1170],
  ['10.00', 660],
  ['11.00', 1030],
  ['12.00', 1000],
  ['13.00', 1170],
  ['14.00', 660],
  ['15.00', 1030],
  ['16.00', 1030],
  ['17.00', 1030],
  ['18.00', 1030],
  ['19.00', 1030]
]

export const options = {
  chart: {
    title: 'Sales Summary',
    subtitle: 'Sales, Expenses, and Profit'
  }
}

export function BarChart() {
  return <Chart chartType="Bar" width="100%" height="400px" data={data} options={options} />
}
