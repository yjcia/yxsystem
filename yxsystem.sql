/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : yxsystem

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-05-12 15:02:41
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `t_charge`
-- ----------------------------
DROP TABLE IF EXISTS `t_charge`;
CREATE TABLE `t_charge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL,
  `charge_cate` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `is_void` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_charge
-- ----------------------------
INSERT INTO `t_charge` VALUES ('1', '1', '1', '12.00', '0', '2014-11-13', '0');
INSERT INTO `t_charge` VALUES ('2', '1', '2', '22.00', '0', '2014-11-13', '0');
INSERT INTO `t_charge` VALUES ('3', '1', '5', '0.00', '1', '2014-11-17', '0');
INSERT INTO `t_charge` VALUES ('4', '1', '3', '0.00', '0', '2014-11-18', '0');
INSERT INTO `t_charge` VALUES ('5', '1', '1', '0.00', '1', '2014-11-17', '0');
INSERT INTO `t_charge` VALUES ('6', '1', '1', '0.00', '1', '2014-11-17', '0');
INSERT INTO `t_charge` VALUES ('7', '1', '1', '0.00', '0', '2014-11-17', '0');
INSERT INTO `t_charge` VALUES ('8', '1', '1', '1211.00', '0', '2014-11-18', '0');

-- ----------------------------
-- Table structure for `t_charge_cate`
-- ----------------------------
DROP TABLE IF EXISTS `t_charge_cate`;
CREATE TABLE `t_charge_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_charge_cate
-- ----------------------------
INSERT INTO `t_charge_cate` VALUES ('1', 'Food');
INSERT INTO `t_charge_cate` VALUES ('2', 'Water');
INSERT INTO `t_charge_cate` VALUES ('3', 'Gas');
INSERT INTO `t_charge_cate` VALUES ('4', 'Telecome');
INSERT INTO `t_charge_cate` VALUES ('5', 'Transport');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'YanJun');
