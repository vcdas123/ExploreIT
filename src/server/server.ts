import * as dotenv from "dotenv";
0;
dotenv.config();

import app from "../app";
import { AppDataSource } from "../appDataSource";

AppDataSource.initialize()
  .then(() => {
    console.log("DB CONNECTION IS SUCCESSFUL!");
  })
  .catch(error => console.log(error));

const PORT: string | 8001 = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
