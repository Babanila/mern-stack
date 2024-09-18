import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}`,
        );

        console.log(
            `MongoDB Connected Successfully!!! DB Host: ${connectionInstance.connection.host}`
                .bgMagenta,
        );
    } catch (error) {
        console.log(colors.bgRed('MONGODB Connection Failed'), error);
        process.exit(1);
    }
};

export { connectToDatabase };
