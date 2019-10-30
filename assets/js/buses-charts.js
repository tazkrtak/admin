---
---

fetchBusesData().then(data => {
  const x = data.map(bus => bus.number);
  const y_passengers = data.map(bus => bus.passengers);
  const y_quantity = data.map(bus => bus.quantity);
  createBusesChart(
    "{{ site.data.buses-charts.id }}-chart",
    x,
    y_passengers,
    y_quantity
  );
});

async function fetchBusesData() {
  const root = "https://my-json-server.typicode.com/tazkrtak/counterfeit";
  const endpoint = "{{ site.data.buses-charts.endpoint }}";
  const response = await fetch(`${root}${endpoint}`);
  return await response.json();
}

function createBusesChart(name, xData, yData1, yData2) {
  var ctx = document.getElementById(name).getContext("2d");

  var gradient_green = ctx.createLinearGradient(0, 0, 0, 450);
  gradient_green.addColorStop(0, "rgba(40, 167, 69, 0.5)");
  gradient_green.addColorStop(0.5, "rgba(40, 167, 69, 0.25)");
  gradient_green.addColorStop(1, "rgba(40, 167, 69, 0)");
  
  var gradient_red = ctx.createLinearGradient(0, 0, 0, 450);
  gradient_red.addColorStop(0, "rgba(255, 0, 0, 0.5)");
  gradient_red.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
  gradient_red.addColorStop(1, "rgba(255, 0, 0, 0)");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: xData,
      datasets: [
        {
          label: "الركاب",
          data: yData1,
          backgroundColor: gradient_green,
          yAxisID: 'passengers-axis'
        },
        {
          label: "الحافلات",
          data: yData2,
          backgroundColor: gradient_red,
          yAxisID: 'quantity-axis'
        }
      ]
    }, 
    options: {
        responsive: true,
        legend: {
          position: 'bottom'
        },
        scales: {
            yAxes: [{
                id: 'passengers-axis',
                type: 'linear',
                ticks: {
                    beginAtZero: true
                }
            }, {
                id: 'quantity-axis',
                type: 'linear',
                position: 'right',
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }
  });
}
