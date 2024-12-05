"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
router.put("/:emailId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { email: req.params.emailId } });
        if (user) {
            yield user.update(req.body);
            console.log(user);
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
router.get("/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { email: req.params.email } });
        if (user) {
            //console.log(user);
            res.status(200).json(user.dataValues);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
