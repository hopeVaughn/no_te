import merge from "lodash.merge";

type Config = {
  stage: string;
  dbUrl?: string;
  jwtSecret?: string;
  port?: string;
  logging: boolean;
};

// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage: string = process.env.STAGE || "local";
let envConfig: Partial<Config> = {};

// dynamically require each config depending on the stage we're in
if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = require("./staging").default;
} else {
  envConfig = require("./local").default;
}

const defaultConfig: Config = {
  stage,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  logging: false,
};

export default merge<Config, Partial<Config>>(defaultConfig, envConfig);
