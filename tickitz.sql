-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 11, 2021 at 09:10 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickitz`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `show_time_id` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `premiere_id`, `show_time_id`, `booking_total_price`, `booking_created_at`) VALUES
(1, 1, 2, 200, '2021-04-30 10:41:51'),
(2, 1, 2, 500, '2021-04-30 10:41:51'),
(3, 2, 1, 700, '2021-03-01 00:00:00'),
(4, 2, 1, 1000, '2021-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(150) NOT NULL,
  `movie_category` varchar(150) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_image` varchar(100) NOT NULL,
  `movie_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movie_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `movie_image`, `movie_created_at`, `movie_updated_at`) VALUES
(3, 'Spiderman', 'Action', '2021-04-08', '', '2021-04-08 10:01:55', NULL),
(4, 'Marvel', 'Action', '2021-04-09', '', '2021-04-09 11:18:30', NULL),
(5, 'Batman', 'Comedy', '2021-12-09', '', '2021-04-09 11:35:43', '2021-04-09 15:03:02'),
(6, 'Star Wars', 'Action', '2021-05-09', '', '2021-04-09 14:13:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `premiere_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_created_at`, `premiere_updated_at`) VALUES
(1, 3, 1, 'CineOne21', 50, '2021-04-20 08:58:17', NULL),
(2, 3, 1, 'Ebu.id', 60, '2021-04-20 08:58:17', NULL),
(3, 3, 1, 'Hiflix', 70, '2021-04-20 08:59:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_created_at`, `user_updated_at`) VALUES
(1, 'Bagus', 'bagustri15@gmail.com', '$2b$10$4MhXuRIR98HAnWSgnxJ4VeW4XsllW0uIidN3wsoiojTImgFbO01uy', '2021-04-27 11:10:54', NULL),
(2, 'Bagus', 'bagustri15@gmail.com', '$2b$10$HuaeJbqa1l2jmwYMubV48u.yBm/uyK0phraYMo4.ElQCbU3htArxu', '2021-05-03 08:51:02', NULL),
(3, 'Bagus', 'bagustri15@gmail.com', '$2b$10$RPo0WQjl3eOzeF2KeK.uzuZVp0qSkQAr168aq4nqVc82gFt0UlOaO', '2021-05-03 08:52:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
