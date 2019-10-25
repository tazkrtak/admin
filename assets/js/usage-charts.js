---
---

{% for interval in site.data.usage-charts.intervals %}
fetchUsageData("{{ interval.endpoint }}").then(data => {
    const x = data.map(month => month.number);
    const y = data.map(month => month.usage);
    createUsageChart("{{ interval.id }}-chart", x, y);
  });
{% endfor %}

async function fetchUsageData(interval) {
  const root = "{{ site.root-endpoint }}";
  const endpoint = "{{ site.data.usage-charts.endpoint }}";
  const response = await fetch(`${root}${endpoint}/${interval}`);
  return await response.json();
}

function createUsageChart(name, xData, yData) {
  var ctx = document.getElementById(name).getContext("2d");

  var gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(40, 167, 69, 0.5)");
  gradient.addColorStop(0.5, "rgba(40, 167, 69, 0.25)");
  gradient.addColorStop(1, "rgba(40, 167, 69, 0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: xData,
      datasets: [
        {
          data: yData,
          backgroundColor: gradient
        }
      ]
    },
    options: {
      legend: {
        display: false
      }
    }
  });
}
