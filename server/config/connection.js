const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.log('Failed to connect to Atlas', error);
        console.log('Attmepting to connect to MongoDB locally');


        try {
            await mongoose.connect('mongodb://localhost:27017/googlebooks', options);
            console.log('Connected to MongoDB locally');
        } catch (error) {
            console.log('Failed to connect to MongoDB locally', error);
            throw localError;
        }
    }
};

connectToMongoDB();

module.exports = mongoose;
