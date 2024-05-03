import dotenv from "dotenv";

import app from './app';

dotenv.config();

const PORT = process.env.PORT;
if(PORT){
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });  
}else{
  console.log("Server PORT not specified ...");
}