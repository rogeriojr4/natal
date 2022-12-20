import Nullstack from "nullstack";

import { PrismaClient } from "@prisma/client";

import Application from "./src/Application";

const context = Nullstack.start(Application);

context.start = async function start() {
  const db = new PrismaClient();

  context.db = db;


  
};

export default context;
