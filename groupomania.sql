-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 28 juin 2021 à 09:43
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `postImageUrl` varchar(500) DEFAULT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`postId`),
  KEY `postId` (`postId`),
  KEY `userId` (`authorId`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`postId`, `authorId`, `title`, `postImageUrl`, `content`, `date`) VALUES
(17, 28, 'autheur 28 article', '', 'mon bon, article !', '2021-06-20 10:11:24'),
(18, 28, 'L\'article sur moi', '', 'Je vais vous raconter de mon enfance ! Il était une fois une petite fille qui portait toujours un chapeau rouge. Tout le monde l\'appelait le Caperon Rouge.', '2021-06-20 10:13:26'),
(58, 65, 'sdfsfd', 'http://localhost:3000/images/giphy[1].gif1624597112318.gif', 'dfsdfsqd', '2021-06-25 06:58:32'),
(59, 65, 'Cat flying', 'http://localhost:3000/images/giphy[1].gif1624597362806.gif', 'Awesome', '2021-06-25 07:02:43');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(80) NOT NULL,
  `lastName` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `role` varchar(255) DEFAULT 'Travaille chez Groupomania',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `imageUrl` varchar(255) DEFAULT '/images/imageDefault.png',
  `password` varchar(100) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `Unique` (`email`) USING BTREE,
  KEY `id` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`userId`, `firstName`, `lastName`, `email`, `role`, `admin`, `imageUrl`, `password`, `date`) VALUES
(27, 'Quentin', 'Tarantino', 'que***@********om', 'mon plenty role', 0, '/images/imageDefault.png', '$2b$10$0eo4RY/r70I0zvzXtIOe.umL0fIDIQD5kxwrq/htv4oamtIi95Rqm', '2021-06-15 11:05:28'),
(28, 'Misiss', 'Clown', 'mai*@******om', 'mon role', 1, '/images/imageDefault.png', '$2b$10$BUNvjnjwqjFdDYo9waLOnepV4ImD0Bhg8SFtZBkqnuZ4XgebuKkJ2', '2021-06-16 08:51:33'),
(46, 'Arthur', 'Haricot', 'art***@*********om', 'Travaille chez nous !', 0, '/images/imageDefault.png', '$2b$10$jzNIEcaM1PJMni6zefBoUOHPQKKSY4vDOGSLC9uoOVe9Xuw9F.En2', '2021-06-19 12:45:06'),
(50, 'Matthieu', 'Ledoigt', 'mat*****@*********om', 'jour et nuit', 0, 'http://localhost:3000/images/arthur.jpg1624509690919.jpg', '$2b$10$GF4KDzutSFFljWWoDfKxRuqXm2z4obw2wB3074Ce6QC6fsEFuW7OC', '2021-06-24 06:34:44'),
(65, 'Katrina', 'Magone', 'kat****@*******fr', 'j\'aimerais être menuisière', 1, 'http://localhost:3000/images/alice.jpg1624869672056.jpg', '$2b$10$ssrjfnOHCYLCgf1BlqfCWuocOh9SXymV8CDeBk4KObQwTsLEKt.iC', '2021-06-24 19:30:23'),
(71, 'Janis', 'Berzins', 'jan**@********fr', 'Travaille chez Groupomania', 0, '/images/imageDefault.png', '$2b$10$y2AbSWqzgwgzOPDsue8zC.wAPSF21w8tmOJCF5qZFD/6PY.ng.rL6', '2021-06-25 19:12:34'),
(84, 'Arthur', 'Legrand', 'mag********@*******om', 'Le cuisinier', 0, 'http://localhost:3000/images/cloud.jpg1624735853814.jpg', '$2b$10$3TS7DQdaTyOL19EJ1uCX0O2SedY88eNoeyy/kUKZSJL1hkdbjOalK', '2021-06-26 18:21:28'),
(86, 'Jana', 'Kudas', 'jan*@******fr', 'Travaille chez Groupomania', 0, '/images/imageDefault.png', '$2b$10$I9BCXD13QYrXO5SogYIcGe65XHXVnNrKPpD.xX6O4I1z0KvpWymDW', '2021-06-26 18:28:53'),
(95, 'Toto', 'Moto', 'que****@**********fr', 'Mon rôle', 0, 'http://localhost:3000/images/cat.jpg1624872061192.jpg', '$2b$10$fs.QSkyieQsVU2JiGCZVWOt9XtZiYqIATQQZ.L2xs/bECKeIOSp1S', '2021-06-28 11:17:33');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
