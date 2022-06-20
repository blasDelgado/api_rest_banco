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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-16  3:23:52
