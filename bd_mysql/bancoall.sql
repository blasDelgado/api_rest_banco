-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: banco_del
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE database banco_del;

use  banco_del;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(50) NOT NULL,
  `apellido_cliente` varchar(50) NOT NULL,
  `telefono_cliente` int NOT NULL,
  `id_sucursal` int NOT NULL,
  `numero_de_cuenta` int NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `id_cliente_UNIQUE` (`id_cliente`),
  KEY `sucursal_cliente_idx` (`id_sucursal`),
  KEY `cuenta_idx` (`numero_de_cuenta`),
  CONSTRAINT `cuenta` FOREIGN KEY (`numero_de_cuenta`) REFERENCES `cuenta` (`numero_de_cuenta`),
  CONSTRAINT `sucursal_cliente` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'juan','perez',1133442332,1,1),(2,'juan','gonzalez',1182423323,2,2),(3,'fracisco','dilo',117874323,2,3),(4,'julian','perez',118092323,3,4),(5,'camila','juarez',119495729,3,5),(6,'esteban','elmino',113498213,2,6),(7,'laura','silas',112148753,2,7),(8,'laura','milez',113340925,3,8),(9,'romina','pretto',11321243,1,9),(10,'lucas','mintes ',110492485,1,10),(11,'jazmin','salerno',110012587,3,11),(12,'micaela','delhorno ',11049264,3,12),(13,'luca','toni',114029110,3,13),(14,'alfredo','fuccile',110924970,2,14),(15,'marcos','cagliari',1109808429,2,15),(16,'martina','schuaer',113032382,2,16),(17,'milagros','pintos',119967882,2,17),(18,'sebastian','bauer',113821809,1,18),(19,'franco','miller',112490870,3,19),(20,'franco','garcia',113214243,3,20),(21,'pedro','miller',113232145,1,21);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta` (
  `numero_de_cuenta` int NOT NULL AUTO_INCREMENT,
  `saldo` int NOT NULL,
  `prestamos_pendientes` tinyint NOT NULL,
  `id_prestamo` int DEFAULT NULL,
  PRIMARY KEY (`numero_de_cuenta`),
  UNIQUE KEY `numero_de_cuenta_UNIQUE` (`numero_de_cuenta`),
  KEY `prestamo1_idx` (`id_prestamo`),
  CONSTRAINT `prestamo1` FOREIGN KEY (`id_prestamo`) REFERENCES `prestamo` (`id_prestamo`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
INSERT INTO `cuenta` VALUES (1,2300,0,NULL),(2,52000,1,1),(3,20900,0,NULL),(4,3070,0,NULL),(5,4010,1,7),(6,100,0,NULL),(7,4000000,1,2),(8,32333,0,NULL),(9,15676,1,3),(10,2000,1,4),(11,300000,1,5),(12,40000,0,NULL),(13,300,1,6),(14,1000,0,NULL),(15,32323,0,NULL),(16,41241,0,NULL),(17,4214111,0,NULL),(18,23244,0,NULL),(19,4222211,0,NULL),(20,93029,0,NULL),(21,98000,0,NULL);
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depositos`
--

DROP TABLE IF EXISTS `depositos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depositos` (
  `id_deposito` int NOT NULL AUTO_INCREMENT,
  `monto_depositado` int NOT NULL,
  `fecha_de_deposito` datetime NOT NULL,
  `numero_de_cuenta` int NOT NULL,
  PRIMARY KEY (`id_deposito`),
  UNIQUE KEY `extraccion_id_UNIQUE` (`id_deposito`),
  KEY `fk_depositos_1_idx` (`numero_de_cuenta`),
  CONSTRAINT `fk_depositos_1` FOREIGN KEY (`numero_de_cuenta`) REFERENCES `cuenta` (`numero_de_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depositos`
--

LOCK TABLES `depositos` WRITE;
/*!40000 ALTER TABLE `depositos` DISABLE KEYS */;
INSERT INTO `depositos` VALUES (1,250,'2020-11-11 00:00:00',2),(2,3300,'2019-06-09 00:00:00',1),(3,20000,'2020-09-01 00:00:00',16),(4,3050,'2019-05-12 00:00:00',15),(5,5000,'2020-02-09 00:00:00',13),(6,1230,'2020-03-09 00:00:00',14),(7,2300,'2020-07-09 00:00:00',15),(8,20000,'2021-11-12 00:00:00',5),(9,1100,'2021-10-01 00:00:00',9),(10,4300,'2021-03-09 00:00:00',2),(11,55100,'2017-02-01 00:00:00',11),(12,13000,'2020-09-04 00:00:00',7),(13,2320,'2020-10-02 00:00:00',14),(14,33380,'2020-11-03 00:00:00',13),(15,47050,'2019-06-08 00:00:00',11),(16,2650,'2020-01-01 00:00:00',2),(17,1680,'2021-01-11 00:00:00',3);
/*!40000 ALTER TABLE `depositos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extracciones`
--

DROP TABLE IF EXISTS `extracciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extracciones` (
  `id_extraccion` int NOT NULL AUTO_INCREMENT,
  `monto_extraido` int NOT NULL,
  `fecha_de_extraccion` datetime NOT NULL,
  `numero_de_cuenta` int NOT NULL,
  PRIMARY KEY (`id_extraccion`),
  UNIQUE KEY `extraccion_id_UNIQUE` (`id_extraccion`),
  KEY `cuenta_idx` (`numero_de_cuenta`),
  CONSTRAINT `fk_extracciones_1` FOREIGN KEY (`numero_de_cuenta`) REFERENCES `cuenta` (`numero_de_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extracciones`
--

LOCK TABLES `extracciones` WRITE;
/*!40000 ALTER TABLE `extracciones` DISABLE KEYS */;
INSERT INTO `extracciones` VALUES (1,200,'2020-11-11 00:00:00',2),(2,100,'2019-06-09 00:00:00',3),(3,20000,'2020-01-10 00:00:00',1),(4,300,'2019-01-12 00:00:00',1),(5,7000,'2020-07-09 00:00:00',4),(6,10,'2020-06-09 00:00:00',4),(7,200,'2020-07-09 00:00:00',5),(8,300000,'2021-11-01 00:00:00',5),(9,400,'2021-01-11 00:00:00',19),(10,300,'2021-03-04 00:00:00',20),(11,100,'2017-04-12 00:00:00',18),(12,3000,'2020-01-04 00:00:00',17),(13,320,'2020-06-02 00:00:00',13),(14,380,'2020-03-03 00:00:00',12),(15,4700,'2019-04-07 00:00:00',11),(16,3650,'2020-11-11 00:00:00',3),(17,5680,'2021-11-11 00:00:00',7);
/*!40000 ALTER TABLE `extracciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamo` (
  `id_prestamo` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `cantidad_prestada` int NOT NULL,
  `cantidad_adeudada` int NOT NULL,
  `fecha_de_otorgamiento` datetime NOT NULL,
  `fecha_de_vencimiento` datetime DEFAULT NULL,
  `id_sucursal_emisora` int NOT NULL,
  PRIMARY KEY (`id_prestamo`),
  UNIQUE KEY `prestamo_id_UNIQUE` (`id_prestamo`),
  KEY `sucursal_idx` (`id_sucursal_emisora`),
  CONSTRAINT `sucursal` FOREIGN KEY (`id_sucursal_emisora`) REFERENCES `sucursal` (`id_sucursal`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (1,1,6000,4000,'2018-12-30 00:00:00','2022-12-30 00:00:00',1),(2,2,16000,14000,'2015-11-10 00:00:00','2023-11-10 00:00:00',2),(3,4,22000,10000,'2019-09-10 00:00:00','2022-09-10 00:00:00',2),(4,5,2000,1000,'2020-08-10 00:00:00','2024-09-10 00:00:00',3),(5,9,32000,3200,'2019-07-10 00:00:00','2023-07-12 00:00:00',3),(6,10,2000,100,'2018-01-10 00:00:00','2024-05-12 00:00:00',3),(7,15,1000,200,'2017-04-10 00:00:00','2022-03-10 00:00:00',3);
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursal` (
  `id_sucursal` int NOT NULL AUTO_INCREMENT,
  `nombre_sucursal` varchar(50) NOT NULL,
  `ciudad_sucursal` varchar(50) NOT NULL,
  `direccion_sucursal` varchar(50) NOT NULL,
  PRIMARY KEY (`id_sucursal`),
  UNIQUE KEY `id_sucursal_UNIQUE` (`id_sucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
INSERT INTO `sucursal` VALUES (1,'belgrano del','buenos aires','juana manso 2774'),(2,'devoto del','buenos aires','sanabria 2332'),(3,'cordoba del','cordoba','peron 4411'),(4,'rosario del','rosario','san martin 5555');
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-16 15:21:30
