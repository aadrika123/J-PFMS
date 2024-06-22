import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { setupSwagger } from "./swagger-setup";

setupSwagger(app);

const PORT = process.env.PORT;

if (PORT) {
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
} else {
  console.log("Server PORT not specified ...");
}
export default app;
