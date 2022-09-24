-- Server version: 8.0.30-mysql

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

-- /! DoTo add :
-- userID
-- name
-- lastname
-- userstatusID
-- isLogged
-- alias



CREATE TABLE `users` (
  userID int unsigned not null auto_increment primary key,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `ischecked` bit(1),
  `isLoged` bit(1),
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `LastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- AUTO_INCREMENT for table `users`
--

ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;



--
-- AUTO_INCREMENT for table `sessions_users`
--

CREATE TABLE `sessions_users` ( 
  `userId` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_bin NOT NULL primary key,
  `ip_address` varchar(255) DEFAULT NULL,
  `browser_id` varchar(255) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `LastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
