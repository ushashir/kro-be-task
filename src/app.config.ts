import dotenv from "dotenv";

dotenv.config();

const env = (key: string, defaultVal: any = undefined) => {
  return process.env[key] || defaultVal;
};

env.require = (key: string, defaultVal: any = undefined) => {
  const value = process.env[key] || defaultVal;
  if (!value) {
    throw new Error(`Environment variable '${key}' is missing!`);
  }

  return value;
};

const config = {
  environment: env.require("NODE_ENV", "development"),
  app: {
    name: "kro-task-api",
    port: parseInt(env("APP_PORT", 3001)),
    hostname: env("APP_HOSTNAME", "0.0.0.0"),
    host: env(
      "APP_HOST",
      `http://localhost:${parseInt(env("APP_PORT", 3001))}`
    ),
    api: {
      version: env("APP_API_VERSION", "api/v1"),
    },
    clientUrl: env.require("APP_CLIENT_URL"),
    legalDocs: [
      {
        filename: "Code of Conduct for use of OctoCare (annexture) final.pdf",
        uri: "code-of-conduct",
      },
      {
        filename: "HCP Terms of Use Agreement for OctoCare v1102.pdf",
        uri: "terms-of-use",
      },
    ],
    schedule: {
      onCallColor: env("SCHEDULE_ON_CALL_COLOR", "#FEEBE1"),
      onLeaveColor: env("SCHEDULE_ON_LEAVE_COLOR", "#367CFF"),
    },
  },
  legal: {
    issuerName: env("LEGAL_ISSUER_NAME"),
    issuerContactPerson: env("LEGAL_ISSUER_CONTACT_PERSON"),
    issuerEmail: env("LEGAL_ISSUER_EMAIL"),
    issuerContactPersonTitle: env("LEGAL_ISSUER_CONTACT_PERSON_TITLE"),
  },
  db: {
    url: env.require("DATABASE_URL"),
  },

  redis: {
    host: env.require("REDIS_HOST", "localhost"),
    port: parseInt(env("REDIS_PORT", "6379")),
    password: env("REDIS_PASSWORD"),
    cacheTtl: parseInt(env.require("CACHE_TTL")),
  },

  jwt: {
    secret: env.require("JWT_SECRET"),
    signOptions: {
      expiresIn: parseInt(env("JWT_EXPIRES", 30 * 60)),
    },
    refreshTokenExpiresIn: parseInt(
      env(
        "JWT_REFRESH_TOKEN_EXPIRES",
        6 * 60 * 60 // 6 hrs
      )
    ),
  },

  swagger: {
    user: { demo: env("SWAGGER_USER_PASSWORD", "12345@") },
  },
};

export default () => config;
