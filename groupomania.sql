-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 28 juin 2021 à 19:11
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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`postId`, `authorId`, `title`, `postImageUrl`, `content`, `date`) VALUES
(82, 103, 'La nature', 'http://localhost:3000/images/sigulda.jpg1624898693063.jpg', 'Hier j\'ai découvert une belle promenade à la campagne et je voulais partager une de photos avec vous.', '2021-06-28 18:44:53'),
(83, 103, 'Le weekend arrive', 'http://localhost:3000/images/giphy[1].gif1624597626492.gif1624898763991.gif', 'J\'espère, que tout le monde a bien travaillé cette semaine. Bon weekend !', '2021-06-28 18:46:03'),
(84, 104, 'Vendredi soir', 'http://localhost:3000/images/dj.jpg1624899236779.jpg', 'Salut les collègues ! Peut être vous voudriez sortir tous ensemble le vendredi soir au Bar de la tour ? Il y aura une soirée avec DJ.', '2021-06-28 18:53:56'),
(85, 104, 'Les propositions pour le nouveau projet CF', 'http://localhost:3000/images/giphy[1].gif1624597112318.gif1624899436867.gif', 'Vous êtes bienvenus de m\'envoyer vos propositions pour le nouveau projet annoncé par la direction', '2021-06-28 18:57:16'),
(87, 104, 'C\'est quoi le métier de communication ?', '', 'Organise, met en œuvre des actions de communication et de diffusion de l\'information et réalise des outils/supports de communication selon la stratégie de l\'entreprise. Peut participer à la définition de la politique de communication et élaborer le plan de communication.', '2021-06-28 19:02:41'),
(88, 105, 'L\'inspiration de la semaine', 'http://localhost:3000/images/giphy[1].gif1624597362806.gif1624899992545.gif', 'Je voulais juste partager avec vous ce chat qui aime voler.', '2021-06-28 19:06:32');

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
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`userId`, `firstName`, `lastName`, `email`, `role`, `admin`, `imageUrl`, `password`, `date`) VALUES
(103, 'Arthur', 'Legrand', 'art***@********fr', 'Chargé de communication', 1, 'http://localhost:3000/images/sergio.jpg1624898559759.jpg', '$2b$10$GRw9HBRKXOXJ8CcQugd0l.J2/PLuq3DbFONg5qHoBp5aR6KGANLpG', '2021-06-28 18:42:00'),
(104, 'Florence', 'Labelle', 'flo*****@********fr', 'Service clients', 0, 'http://localhost:3000/images/alice.jpg1624900135537.jpg', '$2b$10$tUGNvwj0o6sQXOWjhUAs1.qiof/NNqDWbYC1fuC6ZOdiRf0ourcyO', '2021-06-28 18:51:28'),
(105, 'Jean', 'Dupierre', 'jea*@*********fr', 'Travaille chez Groupomania', 0, 'http://localhost:3000/images/pablo.jpg1624900081817.jpg', '$2b$10$vt8usnHyMpV9/PetiO94y.nqMFOoZjKOHudBPwtQvjVQ7HsiSYF0.', '2021-06-28 19:04:57');

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
