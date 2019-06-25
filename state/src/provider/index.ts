import { IStateModel, MODEL_NAME, StateSchema } from "./state.model";
import { StateModelFactory } from "./state.model.factory";
import { IStateProvider, makeStateProvider } from "./state.provider";
import { Configuration, ConfigurationKey } from "./utils";
export * from "./state.model";
export * from "./state.model.factory";
export * from "./state.provider";
export * from "./utils";

const uri: string = `${Configuration.get(
  ConfigurationKey.DATABASE_URL
)}/${Configuration.get(ConfigurationKey.DATABASE_NAME)}`;

const options = {
  password: Configuration.get(ConfigurationKey.DATABASE_PASSWORD),
  username: Configuration.get(ConfigurationKey.DATABASE_USER_NAME)
};

const stateModelFactory = new StateModelFactory(uri, options);
let StateModel: IStateModel | undefined;

async function getStateModel() {
  if (StateModel === undefined) {
    StateModel = await stateModelFactory.model(MODEL_NAME, StateSchema);
  }

  return StateModel;
}

export const StateProvider: IStateProvider = makeStateProvider({
  getStateModel
});
