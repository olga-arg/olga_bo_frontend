<template>
  <div class="p-4 sm:ml-64">
    <div class="px-24">
      <div class="flex mb-4">
        <div class="flex items-center h-12 rounded">
          <div className="pr-10 font-medium text-xl">
            <p :class="activeRoute === 'members' ? 'text-[#1C2E3D]' : 'text-[#8D8B96]'">Dashboard</p>
            <div className="h-0.5 w-full bg-red-400 mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="dashboard"></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24 flex gap-5">
        <div class="w-2/3 flex-col">
          <div class="my-2 h-48 flex gap-2">
            <div class="w-1/3 rounded-xl bg-white">
              <a>Total Balance</a>
            </div>
            <div class="w-1/3 rounded-xl bg-white">
              <a>Total Profit</a>
            </div>
            <div class="w-1/3 rounded-xl bg-white">
              <a>Total Expenses</a>
            </div>
          </div>
          <div class="bg-white my-2 rounded-xl">
            <apexchart height="280" :options="barChartOptions" :series="barSeries"></apexchart>
          </div>
          <div class="bg-white my-2 rounded-xl">
            <apexchart type="line" height="280" :options="lineChartOptions" :series="lineSeries"></apexchart>
          </div>
        </div>
        <div class="bg-blue-100 w-1/3 flex-col">
          <div class="bg-white h-1/3 flex items-center">
            <apexchart :options="pieChartOptions" :series="pieSeries"></apexchart>
          </div>
          <div class="bg-purple-300 h-2/4">b</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  data() {
    return {
      pieSeries: [70, 55, 41, 17, 15],
      pieChartOptions: {
        chart: {
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        labels: ['Comida y Bebidas', 'Donaciones', 'Shopping', 'Supermercado', 'Otros'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
        legend: {
          position: 'bottom',
        },
      },
      lineSeries: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      lineChartOptions: {
        chart: {
          height: 350,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'text',
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
      },
      barSeries: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
      ],
      barChartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            },
          },
        },
      },
    }
  },
  components: {
    Sidebar,
    Navbar,
  },
}
</script>
