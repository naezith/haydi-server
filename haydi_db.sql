-- phpMyAdmin SQL Dump
-- version 4.4.15.8
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 13, 2017 at 12:33 PM
-- Server version: 5.5.50-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `haydi_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `date` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  `location` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `author_id`, `name`, `date`, `time`, `location`) VALUES
(3, 49, 'Gezi', '28 1 2017', '17 : 30', '40.7127837/-74.0059413'),
(8, 49, 'Toplanti', '29 1 2017', '13 : 12', '38.423734/27.142826');

-- --------------------------------------------------------

--
-- Table structure for table `act_guest`
--

CREATE TABLE IF NOT EXISTS `act_guest` (
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `act_guest`
--

INSERT INTO `act_guest` (`user_id`, `activity_id`, `status`) VALUES
(49, 3, 0),
(49, 8, 0),
(84, 3, 0),
(102, 8, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `phone`, `name`) VALUES
(2, '05364726132', 'Tolga Ay'),
(22, '05452940777', 'Yigitcan Uçum'),
(24, '05347644469', 'Çağatay Tanyıldız'),
(30, '05061011920', 'Elvin Osmanlı'),
(33, '05073278977', 'Halim Ayçeman'),
(34, '05367045834', 'Aytaç Ressam'),
(36, '05559998833', 'Ata Doruk'),
(49, '05427147927', 'Samir Samedov'),
(84, '05455294421', 'Ercan Yildiz'),
(87, '05362618848', 'Onur Yabanat'),
(88, '05549726998', 'Yasin'),
(95, '0513667427', 'Parvin Najafov'),
(100, '05442328560', 'Kerem Usta'),
(101, '05555555555', 'Sana Ne'),
(102, '05417176388', 'Muharrem ŞERİF USTA ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `act_guest`
--
ALTER TABLE `act_guest`
  ADD UNIQUE KEY `unique_index` (`user_id`,`activity_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tel_no` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=103;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
