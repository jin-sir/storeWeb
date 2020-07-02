CREATE DATABASE  IF NOT EXISTS `shopstore` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shopstore`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shopstore
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `atoken` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=ujis;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'j-admin','8888','a3be7782-53b1-418d-859d-03483032c1ad'),(2,'11w','111','1576944804');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderlist`
--

DROP TABLE IF EXISTS `orderlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `produceId` varchar(50) NOT NULL,
  `isdelivery` tinyint(1) NOT NULL,
  `auctionSku` varchar(45) DEFAULT NULL,
  `receivingId` varchar(50) NOT NULL,
  `qty` int(11) NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  KEY `produceId_idx` (`produceId`),
  KEY `receivingId_idx` (`receivingId`),
  CONSTRAINT `produceId` FOREIGN KEY (`produceId`) REFERENCES `producelist` (`id`),
  CONSTRAINT `receivingId` FOREIGN KEY (`receivingId`) REFERENCES `receiving` (`id`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `userinfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderlist`
--

LOCK TABLES `orderlist` WRITE;
/*!40000 ALTER TABLE `orderlist` DISABLE KEYS */;
INSERT INTO `orderlist` VALUES (13,'2d53f147-ef62-4137-852d-c794c7c7a67d','5e34f54a-2afc-4417-a52d-0454529a4e14',0,'','da544d14-e127-4862-ac40-2d0da5239857',3,1577378017),(14,'2d53f147-ef62-4137-852d-c794c7c7a67d','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','d29952c0-7dcd-4325-ad65-bd3ed308af46',3,1577378040),(15,'2d53f147-ef62-4137-852d-c794c7c7a67d','64d01827-8ea9-4187-ba85-a3f0ca7432d3',0,'颜色分类:白色;尺码:45;','da544d14-e127-4862-ac40-2d0da5239857',2,1577378067),(16,'2d53f147-ef62-4137-852d-c794c7c7a67d','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','da544d14-e127-4862-ac40-2d0da5239857',26,1577382150),(17,'2d53f147-ef62-4137-852d-c794c7c7a67d','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','d29952c0-7dcd-4325-ad65-bd3ed308af46',26,1577382248),(18,'2d53f147-ef62-4137-852d-c794c7c7a67d','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','da544d14-e127-4862-ac40-2d0da5239857',26,1577382365),(19,'2d53f147-ef62-4137-852d-c794c7c7a67d','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','da544d14-e127-4862-ac40-2d0da5239857',26,1577382424),(20,'2d53f147-ef62-4137-852d-c794c7c7a67d','5e34f54a-2afc-4417-a52d-0454529a4e14',0,'','d29952c0-7dcd-4325-ad65-bd3ed308af46',1,1577382600),(21,'2d53f147-ef62-4137-852d-c794c7c7a67d','5e34f54a-2afc-4417-a52d-0454529a4e14',0,'','d29952c0-7dcd-4325-ad65-bd3ed308af46',1,1577382708),(22,'2d53f147-ef62-4137-852d-c794c7c7a67d','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','123',1,1577382745),(23,'2d53f147-ef62-4137-852d-c794c7c7a67d','01954ebf-f120-43e7-8a7a-3cd6189f7c19',0,'颜色分类:黑色;尺码:xl;','da544d14-e127-4862-ac40-2d0da5239857',1,1577382846),(24,'7d19fd54-d76a-4818-bc9c-a91f5f39c31e','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','f1e5f9f9-68f4-4b94-b54a-85185d814c78',2,1577410718),(25,'7d19fd54-d76a-4818-bc9c-a91f5f39c31e','5e34f54a-2afc-4417-a52d-0454529a4e14',0,'','afe7c6f2-59e3-4aef-a67a-6101f3b3c6f7',1,1577410975),(26,'7d19fd54-d76a-4818-bc9c-a91f5f39c31e','64d01827-8ea9-4187-ba85-a3f0ca7432d3',0,'颜色分类:黑色;尺码:40;','afe7c6f2-59e3-4aef-a67a-6101f3b3c6f7',1,1577410975),(27,'7d19fd54-d76a-4818-bc9c-a91f5f39c31e','d65acba3-b557-4536-b3e2-280db1923efa',0,'颜色分类:白色;尺码:xxxl;款式:男款女款','afe7c6f2-59e3-4aef-a67a-6101f3b3c6f7',1,1577410975),(28,'7d19fd54-d76a-4818-bc9c-a91f5f39c31e','5e34f54a-2afc-4417-a52d-0454529a4e14',0,'','d1daf179-c5be-4abe-add7-f875d41770dc',1,1577411593),(29,'9a445838-ebf2-4e2d-b1d7-514ab2a8fe95','d65acba3-b557-4536-b3e2-280db1923efa',0,'颜色分类:白色;尺码:xxxl;款式:男款女款','4598822a-05e4-4fbc-96df-056782b4e6c9',1,1577411670),(30,'9a445838-ebf2-4e2d-b1d7-514ab2a8fe95','55715dbf-b714-41ce-a04c-de5e8bc3aa85',0,'','4598822a-05e4-4fbc-96df-056782b4e6c9',1,1577411705);
/*!40000 ALTER TABLE `orderlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producelist`
--

DROP TABLE IF EXISTS `producelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producelist` (
  `id` varchar(50) NOT NULL,
  `produceName` varchar(100) NOT NULL,
  `storeName` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `cover` varchar(300) NOT NULL,
  `style` varchar(100) DEFAULT NULL,
  `category` varchar(45) NOT NULL,
  `size` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `cumulativeEvaluation` int(11) NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producelist`
--

LOCK TABLES `producelist` WRITE;
/*!40000 ALTER TABLE `producelist` DISABLE KEYS */;
INSERT INTO `producelist` VALUES ('01954ebf-f120-43e7-8a7a-3cd6189f7c15','极品短袖','prity',59,1212,1,'images/shopsImgs/838ed7ef5b0043c66dcab4a08c203d8d.jpg,images/shopsImgs/7f859acd2bd2a632adad0737f4b120ea.jpg,','','短袖','s,l,xl,xxl,','黑色,蓝色',0,1576931942),('01954ebf-f120-43e7-8a7a-3cd6189f7c19','极品短袖','prity',59,1212,1,'images/shopsImgs/838ed7ef5b0043c66dcab4a08c203d8d.jpg,images/shopsImgs/7f859acd2bd2a632adad0737f4b120ea.jpg,','','短袖','s,l,xl,xxl,','黑色,蓝色',0,1576931942),('55715dbf-b714-41ce-a04c-de5e8bc3aa85','蒙牛纯牛奶','蒙牛官方旗舰店',65,10324,1,'images/shopsImgs/a254596abec1ab91511c864493a05463.jpg,images/shopsImgs/2df7cc198718cc962020b00875e5d6dd.jpg,images/shopsImgs/767cf6409ef0c0c6210891c6b52a3b41.jpg,','','饮品','','',0,1576943981),('5e34f54a-2afc-4417-a52d-0454529a4e14','学生党寝室必备小火锅','美的官方旗舰店',159,1123,1,'images/shopsImgs/9c941995834815226c0e50d3a73ce5be.jpg,images/shopsImgs/dac51bcd094c3c59574307fe57ff64df.jpg,','','电器','','',0,1577003299),('64d01827-8ea9-4187-ba85-a3f0ca7432d3','回力小白鞋','回力专卖店',99,50008,1,'images/shopsImgs/11f8d2754af039f0ec211a307a1bb2c8.jpg,images/shopsImgs/d432669652e4dabdb7e215373bdc7b0a.jpg,','','鞋类','40,41,42,43,44,45','黑色,白色',0,1576943502),('64d01827-8ea9-4187-ba85-a3f0ca7432d7','回力小白鞋','回力专卖店',99,50008,0,'images/shopsImgs/11f8d2754af039f0ec211a307a1bb2c8.jpg,images/shopsImgs/d432669652e4dabdb7e215373bdc7b0a.jpg,','','鞋类','40,41,42,43,44,45','黑色,白色',0,1576943502),('d65acba3-b557-4536-b3e2-280db1923efa','抗寒神器冬天必备','莫斯等',89,890,1,'images/shopsImgs/24dc0bf4bae17018cd77b5dab9e779e9.jpg,images/shopsImgs/8f2ba0153d49c7ad02f7f4ae7a089313.jpg,images/shopsImgs/b9349ed09b2f4ea26869b35ab5095641.jpg,images/shopsImgs/ee75fd4660da67259a1b770d7b75b9d7.jpg,images/shopsImgs/fcf8048d9a9aaf1d3c6f44469199d5e1.jpg,','男款女款','外套','xl,xxl,xxxl','黑色,白色',0,1576931030),('d65acba3-b557-4536-b3e2-280db1923efb','抗寒神器冬天必备','莫斯等',89,890,0,'images/shopsImgs/24dc0bf4bae17018cd77b5dab9e779e9.jpg,images/shopsImgs/8f2ba0153d49c7ad02f7f4ae7a089313.jpg,images/shopsImgs/b9349ed09b2f4ea26869b35ab5095641.jpg,images/shopsImgs/ee75fd4660da67259a1b770d7b75b9d7.jpg,images/shopsImgs/fcf8048d9a9aaf1d3c6f44469199d5e1.jpg,','男款女款','外套','xl,xxl,xxxl','黑色,白色',0,1576931030);
/*!40000 ALTER TABLE `producelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receiving`
--

DROP TABLE IF EXISTS `receiving`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receiving` (
  `id` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `consignee` varchar(45) NOT NULL,
  `tel` varchar(50) NOT NULL,
  `province` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `originPlace` varchar(45) NOT NULL,
  `detailAddress` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receiving`
--

LOCK TABLES `receiving` WRITE;
/*!40000 ALTER TABLE `receiving` DISABLE KEYS */;
INSERT INTO `receiving` VALUES ('05f94fdb-47c6-4082-ae4c-ee4ecbd2f90b','2d53f147-ef62-4137-852d-c794c7c7a67d','l111000','1515','1','2','3','4'),('123','2d53f147-ef62-4137-852d-c794c7c7a67d','li','1515','1','2','3','4'),('279fcd79-360c-4593-ae59-3b7f5a2ba04f','7d19fd54-d76a-4818-bc9c-a91f5f39c31e','金凌飞','13902005254','浙江','杭州','富阳','高科路'),('4598822a-05e4-4fbc-96df-056782b4e6c9','9a445838-ebf2-4e2d-b1d7-514ab2a8fe95','lala','14725836998','ZHEJAING','HANGZHOU','FUYANG','GAOKELU'),('afe7c6f2-59e3-4aef-a67a-6101f3b3c6f7','7d19fd54-d76a-4818-bc9c-a91f5f39c31e','金飞飞','18268785989','浙江省','杭州市','富阳区','富春街道高科路198号'),('d1daf179-c5be-4abe-add7-f875d41770dc','7d19fd54-d76a-4818-bc9c-a91f5f39c31e','你爷','18763829617','浙江','杭州','富阳','龙山路'),('d29952c0-7dcd-4325-ad65-bd3ed308af46','2d53f147-ef62-4137-852d-c794c7c7a67d','几行其','17398050778','浙江省','杭州市','富阳区','富春街道高科路198号'),('da544d14-e127-4862-ac40-2d0da5239857','2d53f147-ef62-4137-852d-c794c7c7a67d','金凌飞','17398050779','浙江省','杭州市','富阳区','高科路198号'),('f1e5f9f9-68f4-4b94-b54a-85185d814c78','7d19fd54-d76a-4818-bc9c-a91f5f39c31e','金小飞','13902004256','浙江省','诸暨市','岭北镇','富家湖村');
/*!40000 ALTER TABLE `receiving` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingcart`
--

DROP TABLE IF EXISTS `shoppingcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppingcart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `qty` int(11) NOT NULL,
  `style` varchar(100) DEFAULT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goodsId_idx` (`goodsId`),
  CONSTRAINT `goodsId` FOREIGN KEY (`goodsId`) REFERENCES `producelist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcart`
--

LOCK TABLES `shoppingcart` WRITE;
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `id` varchar(50) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('2d53f147-ef62-4137-852d-c794c7c7a67d','ceshi','jlf123456','17398050779',1576944804),('7d19fd54-d76a-4818-bc9c-a91f5f39c31e','username','12345678','17398050778',1577324584),('9a445838-ebf2-4e2d-b1d7-514ab2a8fe95','2018002315','147258369','17398050776',1577411623);
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-27  9:59:29
