<script>
import { Line } from 'vue-chartjs'
const brandPrimary = '#007bff'
const datasets = [
  {
    label: 'Dataset',
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,.55)',
    data: [65, 59, 84, 84, 51, 55, 40]
  }
]
export default {
  extends: Line,
  props: ['height'],
  options: {
      legend: {
          display: false
      }
  },
  mounted () {
    this.renderChart({
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          datasets: [{
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
    })
  }
}
</script>