import merge from "lodash.merge";

// define the Config type, which represents the shape of our application configuration
type Config = {
  stage: string;
  dbUrl?: string;
  jwtSecret?: string;
  port?: string | number;
  logging: boolean;
};

// make sure NODE_ENV is set to a default value of "development"
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// set the stage value to the value of the STAGE environment variable, or "local" if it is not set
const stage: string = process.env.STAGE || "local";

// create a variable to hold the environment-specific configuration, initialized as an empty object
let envConfig: Partial<Config> = {};

// dynamically require the appropriate config file based on the current stage
if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = require("./staging").default;
} else {
  envConfig = require("./local").default;
}

// define the default configuration object, which includes the stage, database URL, JWT secret, port, and logging settings
const defaultConfig: Config = {
  stage,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  logging: false,
};

// merge the default configuration with the environment-specific configuration using the lodash.merge function, and export the resulting object as the default export of this module
export default merge<Config, Partial<Config>>(defaultConfig, envConfig);
