"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var short_services_1 = require("../services/short.services");
var router = express_1.Router();
router.post('/', short_services_1.shortUrl);
router.get('/:id', short_services_1.getUrl);
exports.default = router;
