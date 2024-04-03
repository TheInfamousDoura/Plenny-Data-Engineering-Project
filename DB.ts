import mongoose from 'mongoose';

const DB = 'mongodb://localhost:27017/test' as string;
// const DB = "mongodb://localhost:27017/data-engineer-task" as string;

export const dbConnection = () => {
  mongoose.connect(DB).then((conn) => {
    console.log(`Database connection: ${conn.connection.host}`);
  });
};

export const dbDisConnection = () => {
  mongoose.disconnect().then(() => {
    console.log(`Database disconnected`);
  });
};
