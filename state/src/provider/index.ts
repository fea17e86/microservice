import { connect, Mongoose } from "mongoose";
import makeStateModel, { IStateModel } from "./state.model";
import makeStateProvider, { IStateProvider } from "./state.provider";
import { Configuration, ConfigurationKey } from "./utils";

const uri: string = `${Configuration.get(
  ConfigurationKey.DATABASE_URL
)}/${Configuration.get(ConfigurationKey.DATABASE_NAME)}`;

const options = {
  pass: Configuration.get(ConfigurationKey.DATABASE_PASSWORD),
  user: Configuration.get(ConfigurationKey.DATABASE_USER_NAME)
};

let connection: Mongoose | undefined;
let StateModel: IStateModel;

export async function getStateModel(): Promise<IStateModel> {
  if (connection === undefined) {
    try {
      connection = await connect(
        uri,
        options
      );
      StateModel = makeStateModel(connection);
    } catch (e) {
      process.stderr.write("Caught error while trying to connect!", e);
    }
  }
  return StateModel;
}

const StateProvider: IStateProvider = makeStateProvider({ getStateModel });

export default StateProvider;
