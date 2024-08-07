-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 30, 2024 at 01:54 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `link_cafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `articulos`
--

CREATE TABLE `articulos` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL UNIQUE COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` enum('PDF','Noticia') COLLATE utf8mb4_general_ci NOT NULL,
  `enlace` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `autor` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `idioma` enum('EN','ES') COLLATE utf8mb4_general_ci DEFAULT NOT NULL
  `id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articulos`
--

INSERT INTO `articulos` (`id`, `nombre`, `tipo`, `enlace`, `fecha`, `autor`, `descripcion`, `idioma`, `id_usuario`) VALUES
(15, '¿Cómo influyen las prácticas agrícolas en la calidad del café?', 'PDF', 'https://www.iai.int/admin/site/sites/default/files/SGP-CRA2060_Folleto_Cafe-UVG_100715_Final_esp_0.pdf', '2024-07-27 00:00:00', 'Julio Jaramillo', 'Explora cómo diferentes métodos de cultivo y recolección afectan el sabor y la calidad del café final.', 'ES', 14),
(16, 'Investigaciones recientes sobre el café y la salud', 'PDF', 'https://federaciondecafeteros.org/static/files/Relaciones%20publicas%20-%20Investigaciones%20recientes%20sobre%20el%20cafe%20y%20la%20salud.pdf', '2024-07-27 00:00:00', 'Federación Nacional de Cafeteros de Colombia', 'Este documento presenta investigaciones recientes sobre los efectos del café en la salud humana, destacando sus beneficios potenciales.', 'ES', 14),
(17, '¿Cuántas variedades de café existen? Guía de variedades', 'Noticia', 'https://quecafe.info/guia-origen-diferencias-variedades-de-cafe/', '2024-07-27 00:00:00', 'Susana Gomez Posada', 'Este artículo explora las diversas variedades de café, sus métodos de cultivo y cómo estos factores influyen en la calidad de la bebida final.', 'ES', 14),
(18, 'Coffee Development Report 2021', 'PDF', 'https://www.ico.org/documents/cy2022-23/coffee-development-report-2021.pdf', '2024-07-27 00:00:00', 'International Coffee Organization (ICO)', 'Este informe proporciona un análisis detallado del desarrollo del sector cafetero en 2021, incluyendo tendencias económicas, desafíos y oportunidades para los productores de café.', 'EN', 14),
(19, 'Digitalization, sustainability, and coffee. Opportunities and challenges for agricultural developmen', 'Noticia', 'https://www.mdpi.com/2504-3900/89/1/22', '2024-07-27 00:00:00', 'Hidalgo, F.; Quiñones-Ruiz, X.F.; Birkenberg, A.; Daum, T.; Bosch, C.; Hirsch, P.; Birner, R.', 'Explora cómo la digitalización puede contribuir a la sostenibilidad en la producción de café, destacando oportunidades y desafíos en el desarrollo agrícola.', 'EN', 14),
(20, 'Adaptation of Small-Scale Tea and Coffee Farmers in Kenya to Climate Change', 'Noticia', 'https://www.mdpi.com/2504-3900/89/1/22', '2024-07-27 00:00:00', 'Karuri, A.N.', 'Analiza cómo los pequeños productores de té y café en Kenia están adaptándose al cambio climático, ofreciendo estrategias y lecciones aprendidas.', 'EN', 14),
(21, 'COVID-19 and Coffee: Impact and Measures', 'PDF', 'https://unctad.org/system/files/official-document/osg2022d1_en.pdf', '2024-07-27 00:00:00', 'United Nations Conference on Trade and Development (UNCTAD)', 'Documento que analiza el impacto de la pandemia de COVID-19 en la industria del café y las medidas tomadas para mitigar sus efectos.', 'EN', 14),
(22, 'Navigating the Coffee Business Landscape: Challenges and Adaptation Strategies in a Changing World', 'Noticia', 'https://www.mdpi.com/2504-3900/89/1/22', '2024-07-27 00:00:00', 'Mariano Peluso', 'Este artículo discute los desafíos y estrategias de adaptación en el negocio del café ante un mundo en constante cambio.', 'EN', 14),
(23, 'Coffee: World Markets and Trade', 'PDF', 'https://apps.fas.usda.gov/psdonline/circulars/coffee.pdf', '2024-07-27 00:00:00', 'USDA Foreign Agricultural Service', 'Este informe proporciona un análisis detallado de los mercados mundiales y el comercio del café, incluyendo datos sobre producción, consumo, exportaciones e importaciones.', 'EN', 14),
(24, 'Coffee Industry Analysis Based on Indicators: Evidence from Starbucks, Luckin, and Nestle SA', 'PDF', 'https://www.researchgate.net/publication/369870325_Coffee_Industry_Analysis_Based_on_Indicators_Evidence_from_Starbucks_Luckin_and_Nestle_SA', '2024-07-27 00:00:00', 'Desconocidos', 'Este estudio analiza la industria del café utilizando indicadores clave, presentando evidencia de tres grandes empresas del sector: Starbucks, Luckin, y Nestle SA.', 'EN', 14);

-- --------------------------------------------------------

--
-- Table structure for table `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int NOT NULL,
  `comentario` text COLLATE utf8mb4_general_ci NOT NULL,
  `id_usuario` int NOT NULL,
  `id_publicacion` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comentarios`
--

INSERT INTO `comentarios` (`id`, `comentario`, `id_usuario`, `id_publicacion`, `fecha`) VALUES
(14, 'good idea!', 15, 81, '2024-07-29 22:41:10');

-- --------------------------------------------------------

--
-- Table structure for table `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL UNIQUE,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `imagen` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fuentes` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` enum('Producción','Barismo','Otros') COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('Verídica','En proceso','No Veridica') COLLATE utf8mb4_general_ci DEFAULT 'En proceso',
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `idioma` enum('EN','ES') COLLATE utf8mb4_general_ci NOT NULL,
  `id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `nombre`, `descripcion`, `imagen`, `fuentes`, `tipo`, `estado`, `fecha`, `idioma`, `id_usuario`) VALUES
(69, 'Evolución del Barista en la Industria del Café', 'Los baristas juegan un papel crucial en la industria del café, especialmente en el sector de especialidad. Su papel ha evolucionado para convertirse en profesionales altamente valorados, con habilidades especializadas en la preparación y conocimiento del café.', 'img1.jpg', 'https://perfectdailygrind.com/es/2024/05/09/papel-del-barista-cafe-de-especialidad/', 'Barismo', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(70, 'Producción y Comercio de Café', 'La cadena de producción y comercio del café es compleja, involucrando desde la caficultura hasta la importación y exportación. Cada paso es crucial para asegurar la calidad del café que llega a los consumidores.', 'img2.png', 'https://perfectdailygrind.com/es/2022/04/20/impacto-barista-en-consumo-de-cafes-especiales/ ', 'Producción', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(71, 'Gestión de Tiendas de Café', 'La gestión de tiendas de café especialidad requiere no solo habilidades en la preparación del café sino también en la creación de una experiencia única para los clientes, incluyendo la oferta de productos complementarios como cócteles con café.', 'img3.jpg', 'https://perfectdailygrind.com/es/2022/04/20/impacto-barista-en-consumo-de-cafes-especiales/ ', 'Otros', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(72, 'Preparación del Café', 'La preparación del café puede variar significativamente según la región y las preferencias personales. Desde el espresso italiano hasta el café filtrado americano, cada método tiene su encanto.', 'img4.jpg', 'https://www.nescafe.com/cam/como-preparar-mejor-mi-cafe', 'Producción', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(73, '¿Cómo han evolucionado las tendencias en la indust', 'Investiga las tendencias actuales en el consumo de café y cómo han cambiado con el tiempo.', 'img5.jpg', 'https://perfectdailygrind.com/es/2022/08/21/cambio-tecnologia-industria-cafe-ultimos-anos/ ', 'Otros', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(74, 'Impacto Ambiental del Café', 'La producción de café tiene un impacto significativo en el medio ambiente, incluyendo la deforestación y el uso intensivo de agua. Sin embargo, existen prácticas sostenibles que buscan minimizar estos efectos.', 'img6.jpg', 'http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S1909-04552020000100093 ', 'Otros', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(75, 'Recetas con Café', 'El café no solo es una bebida deliciosa por sí misma, sino que también puede ser un ingrediente sorprendente en diversas recetas, desde postres hasta platos principales.', 'img7.jpg', 'https://www.bonappetit.com/search?q=coffee%20recipes', 'Otros', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(76, 'Consejos para Comprar Buen Café', 'Elegir el café perfecto puede ser un desafío. Aquí te dejo algunos consejos para asegurarte de que siempre compres un café de calidad superior.', 'img9.png', 'https://www.ncausa.org/About-Coffee/How-to-Buy-Good-Coffee', 'Producción', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(77, '¿Qué hace que un barista sea excepcional?', 'Discute las habilidades y conocimientos que distinguen a un gran barista, desde la técnica hasta la pasión por el café.', 'img10.jpg', 'https://catoex.com.mx/que-hace-a-un-barista-de-cafe-verdaderamente-especial/#:~:text=Saben%20c%C3%B3', 'Barismo', 'En proceso', '2024-07-27 00:00:00', 'ES', 14),
(78, 'What Role Does Soil Quality Play in Coffee Product', 'Dive into how soil quality impacts coffee plant growth and bean development, affecting the overall flavor profile of the coffee.', 'img11.jpg', 'https://perfectdailygrind.com/2023/08/soil-health-regenerative-agriculture-coffee/#:~:text=Another%2', 'Producción', 'En proceso', '2024-07-27 00:00:00', 'EN', 14),
(79, 'How Does Climate Change Impact Coffee Cultivation?', 'Explore the challenges coffee growers face due to climate change and the strategies they employ to mitigate its effects.', 'img12.png', 'https://clivecoffee.com/blogs/learn/how-climate-change-is-affecting-coffee#:~:text=With%20the%20risi', 'Producción', 'En proceso', '2024-07-27 00:00:00', 'EN', 14),
(80, 'What Skills Make a Master Barista?', 'Discuss the essential skills and knowledge that set master baristas apart, from latte art to understanding coffee extraction principles.', 'img13.png', 'https://www.baristahustle.com/', 'Barismo', 'En proceso', '2024-07-27 00:00:00', 'EN', 14),
(81, 'How Do Baristas Innovate with Coffee Recipes?', 'Look at how baristas experiment with coffee recipes to create unique beverages, pushing the boundaries of traditional coffee preparation.', 'img14.jpg', 'https://sprudge.com/', 'Barismo', 'En proceso', '2024-07-27 00:00:00', 'EN', 14),
(82, 'What Are the Latest Trends in Coffee Consumption?', 'Examine current trends in coffee consumption, including cold brew, nitro coffee, and the rise of specialty coffee shops.', 'img15.jpg', 'https://perfectdailygrind.com/2024/04/us-consumption-hits-20-year-high-specialty-coffee-trends/', 'Otros', 'En proceso', '2024-07-27 00:00:00', 'EN', 14),
(83, 'How Does Coffee Contribute to Community Developmen', 'Investigate the role of coffee in supporting community development, from economic growth to social initiatives in coffee-growing regions.', 'img16.jpg', 'https://www.cottlecoffee.com.au/news/2018/4/3/coffee-industry-social-impact-and-community-change ', 'Otros', 'En proceso', '2024-07-27 00:00:00', 'EN', 14);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre_completo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL UNIQUE,
  `clave` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` enum('usuario','admin','redactor') COLLATE utf8mb4_general_ci DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_completo`, `correo`, `clave`, `tipo`) VALUES
(11, 'Leomar Andres', 'nicolas@gmail.com', 'nicolas123', 'usuario'),
(14, 'Estefaní Chilito Zuñiga', 'admin@gmail.com', 'admin', 'admin'),
(15, 'Pedro', 'pedro@gmail.com', 'pedro123', 'usuario');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `crear` (`id_usuario`);

--
-- Indexes for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comenta` (`id_usuario`),
  ADD KEY `posteado_en` (`id_publicacion`);

--
-- Indexes for table `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publica` (`id_usuario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `crear` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comenta` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `posteado_en` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id`);

--
-- Constraints for table `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publica` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
