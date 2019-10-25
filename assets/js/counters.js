---
---

{% for counter in site.data.counters %}
fetchCounterData("{{ counter.endpoint }}").then(data => {
  new CountUp("{{ counter.id }}-counter", 0, data.value, 0, 1).start();
});
{% endfor %}

async function fetchCounterData(counter) {
  const root = "{{ site.root-endpoint }}";
  const response = await fetch(`${root}${counter}`);
  return await response.json();
}
