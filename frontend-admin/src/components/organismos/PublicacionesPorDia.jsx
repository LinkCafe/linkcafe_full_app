import { BarChart, Title } from "@tremor/react";

const PublicacionesPorDia = ({ data }) => {
    // Agrupar las publicaciones por fecha
    const publicacionesPorDia = data.reduce((acc, publicacion) => {
      const fecha = new Date(publicacion.fecha).toLocaleDateString();
      if (!acc[fecha]) {
        acc[fecha] = 0;
      }
      acc[fecha]++;
      return acc;
    }, {});
  
    // Formatear los datos para el gráfico de barras
    const chartData = Object.entries(publicacionesPorDia).map(([fecha, cantidad]) => ({
      fecha,
      'Cantidad de publicaciones': cantidad,
    }));
  
    // Calcular el valor máximo para escalar las barras
    const maxValue = Math.max(...chartData.map(item => item['Cantidad de publicaciones']));
  
    const barChartProps = {
      data: chartData,
      index: 'fecha',
      categories: ['Cantidad de publicaciones'],
      colors: ['blue'],
      yAxisWidth: 40,
      valueFormatter: (number) => `${number}`,
      marginTop: 'mt-6',
      barWidth: 30,
      barSpacing: 4,
      animation: true,
      enableGridX: false,
      enableGridY: false,
      maxValue: maxValue === 1 ? 2 : maxValue * 1.2,
    };
  
    return (
      <div className="w-full h-full">
        <Title className="text-3xl font-semibold">Publicaciones por día</Title>
        <BarChart {...barChartProps} />
      </div>
    );
  };

  export default PublicacionesPorDia