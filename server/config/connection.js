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
const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.MONGODB_URI, options);
        console.log('Connected to MongoDB Atlas');
    }
    catch (error) {
        console.log('Failed to connect to Atlas', error);
        console.log('Attmepting to connect to MongoDB locally');
        try {
            yield mongoose.connect('mongodb://localhost:27017/googlebooks', options);
            console.log('Connected to MongoDB locally');
        }
        catch (error) {
            console.log('Failed to connect to MongoDB locally', error);
            throw localError;
        }
    }
});
connectToMongoDB();
module.exports = mongoose;
