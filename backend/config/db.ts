import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
const uri: string = process.env.MONGO_URI ?? '';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToDatabase() {
    try {
        await client.connect();

        console.log(
            colors.blue.underline('You successfully connected to MongoDB!!!'),
        );
    } catch (error) {
        console.log('MongoDB Error', error);
        await client.close();
        process.exit(1);
    } finally {
        await client.close();
    }
}

export { connectToDatabase };
