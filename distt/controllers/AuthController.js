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
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const LibraryErrors_1 = require("../utils/LibraryErrors");
function handleRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const registerdUser = yield (0, UserService_1.register)(user);
            res.status(201).json({
                message: "WHOA! User Successfully Created!",
                user: {
                    _id: registerdUser._id,
                    type: registerdUser.type,
                    firstName: registerdUser.firstName,
                    lastName: registerdUser.lastName,
                    email: registerdUser.email
                }
            });
        }
        catch (error) {
            if (error.message.includes("E11000 duplicate key error collection:")) {
                res.status(409).json({ message: "Oh No!, User with email Already exists!", error: error.message });
            }
            else {
                res.status(500).json({ message: "Sorry, Unable to register user at this time", error: error.message });
            }
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = req.body;
        try {
            const loggedIn = yield (0, UserService_1.login)(credentials);
            res.status(200).json({
                message: "User logged in succesfully!",
                user: {
                    _id: loggedIn._id,
                    type: loggedIn.type,
                    firstName: loggedIn.firstName,
                    lastName: loggedIn.lastName,
                    email: loggedIn.email
                }
            });
        }
        catch (error) {
            if (error instanceof LibraryErrors_1.InvalidUsernameOrPasswordError) {
                res.status(401).json({ message: "Unable to login user at this time", error: error.message });
            }
            else {
                res.status(500).json({ message: "Unable to login user at this time", error: error.message });
            }
        }
    });
}
exports.default = { handleRegister, handleLogin };
