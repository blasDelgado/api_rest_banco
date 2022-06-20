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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-16  3:23:52
