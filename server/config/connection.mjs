import mongoose from 'mongoose';

const options = {};

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('Connected to MongoDB Atlas');
    } catch (atlasError) {
        console.log('Failed to connect to Atlas', atlasError);
        console.log('Attmepting to connect to MongoDB locally');


        try {
            await mongoose.connect('mongodb://localhost:27017/googlebooks', options);
            console.log('Connected to MongoDB locally');
        } catch (localError) {
            console.log('Failed to connect to MongoDB locally', localError);
            throw localError;
        }
    }
};

connectToMongoDB();

export default mongoose;
