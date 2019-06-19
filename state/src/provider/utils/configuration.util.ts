export enum ConfigurationKey {
  DATABASE_URL = "DATABASE_URL",
  DATABASE_NAME = "DATABASE_NAME",
  DATABASE_USER_NAME = "DATABASE_USER_NAME",
  DATABASE_PASSWORD = "DATABASE_PASSWORD",
  NODE_ENV = "NODE_ENV",
  MESSAGE_BROKER_HOST = "MESSAGE_BROKER_HOST",
  MESSAGE_BROKER_PORT = "MESSAGE_BROKER_PORT",
  MESSAGE_BROKER_USERNAME = "MESSAGE_BROKER_USERNAME",
  MESSAGE_BROKER_PASSWORD = "MESSAGE_BROKER_PASSWORD",
}

export const defaults = {
  [ConfigurationKey.DATABASE_NAME]: "medtower-radar",
  [ConfigurationKey.DATABASE_URL]: "mongodb://localhost:27017",
  [ConfigurationKey.DATABASE_USER_NAME]: "root",
  [ConfigurationKey.DATABASE_PASSWORD]: "example",
  [ConfigurationKey.NODE_ENV]: "development",
  [ConfigurationKey.MESSAGE_BROKER_HOST]: "localhost",
  [ConfigurationKey.MESSAGE_BROKER_PORT]: "5672",
  [ConfigurationKey.MESSAGE_BROKER_USERNAME]: "",
  [ConfigurationKey.MESSAGE_BROKER_PASSWORD]: "",
};

export function get(key: ConfigurationKey): string {
  return process.env[key] || defaults[key];
}
