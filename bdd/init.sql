-- Path: bdd/init.sql
-- Date: 2020-04-28 14:00:00
DROP DATABASE IF EXISTS IAPau;
CREATE DATABASE IAPau;
USE IAPau;

CREATE TABLE `DataChallenge` (
    `idDataC` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`idDataC`)
);

CREATE TABLE `User` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(20) NOT NULL,
    `lastName` VARCHAR(31) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `number` VARCHAR(11) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Group` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `idDataC` INT UNSIGNED NOT NULL,
    `idLeader` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idDataC`) REFERENCES `DataChallenge`(`idDataC`) ON DELETE CASCADE,
    FOREIGN KEY (`idLeader`) REFERENCES `User`(`id`)
);

CREATE TABLE `Admin` (
    `idUser` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`idUser`),
    FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Student` (
    `idUser` INT UNSIGNED NOT NULL,
    `idGroup` INT UNSIGNED NOT NULL,
    `school` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`idUser`),
    FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`idGroup`) REFERENCES `Group`(`id`)
);

CREATE TABLE `Manager` (
    `idUser` INT UNSIGNED NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `startDate` date,
    `endDate` date,
    PRIMARY KEY (`idUser`),
    FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Gerer` (
    `idUser` INT UNSIGNED NOT NULL,
    `idDataC` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`idUser`, `idDataC`),
    FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`idDataC`) REFERENCES `DataChallenge`(`idDataC`) ON DELETE CASCADE
);