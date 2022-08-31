const options = {

        series: [{
          name: "CLP",
          data: []
      }],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
    //   title: {
    //     text: '',
    //     align: 'left'
    //   },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [],
      }
};


const getData = async (indicador) => {
    try {
        const response = await fetch(`https://mindicador.cl/api/${indicador}`);
        const json = await response.json();

        return json;
    } catch(e) {
        console.log(e);
    }
};

const renderChart = (serie) => {
    const ultimos10 = serie.slice(0, 10);
    ultimos10.reverse();

    options.series[0].data = [];
    options.xaxis.categories = []; 

    ultimos10.forEach((dia) =>{
        options.series[0].data.push(dia.valor);
        options.xaxis.categories.push(dia.fecha.split("T")[0]);
    });


const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
};

const btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
    const inputClp = document.getElementById("input-clp").value;

    const currency = document.getElementById("currency").value;
    
    if(!inputClp) {
      const error = document.getElementById("error-alert");
      error.innerHTML = "Ingrese valor a cambiar";
    } else {

    const data = await getData(currency);

    console.log(data);

    let conversion = inputClp / data.serie[0].valor;

    const resultado = document.getElementById("result");
    resultado.innerHTML = `$${conversion.toFixed(2)}`;
  

    renderChart(data.serie);
  }
});


