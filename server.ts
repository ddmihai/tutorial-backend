import http from 'http';
import app from './app';
import connectDB from './src/database/connection';



const port = process.env.PORT || 8888;
const server = http.createServer(app);



const startServer = async () => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    await connectDB();
}


startServer();