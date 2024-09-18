import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
const uri: string = process.env.MONGO_URI ?? '';
const dbName: string = process.env.DB_NAME ?? '';

const connectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${uri}/${dbName}`);

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
