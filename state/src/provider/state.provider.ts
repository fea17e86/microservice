import { BatteryCharge, Id, IStateItem, State } from "../entities";
import { IStateDocument, IStateModel } from "./state.model";

interface IBuildMakeStateProviderOptions {
  getStateModel: () => Promise<IStateModel>;
}

interface IStateProperties {
  state: State;
  batteryCharge?: BatteryCharge;
}

export interface IStateProvider {
  find: (properties: Partial<IStateItem>) => Promise<IStateDocument[]>;
  get: (id: Id) => Promise<IStateDocument | undefined>;
  insert: (item: IStateItem) => Promise<IStateDocument>;
  update: (
    id: Id,
    properties: Partial<IStateProperties>
  ) => Promise<IStateDocument | undefined>;
}

export default function makeStateProvider({
  getStateModel
}: IBuildMakeStateProviderOptions): IStateProvider {
  async function find(
    properties: Partial<IStateItem> = {}
  ): Promise<IStateDocument[]> {
    const StateModel = await getStateModel();
    const query = StateModel.find(properties);
    return query.exec();
  }

  async function get(id: Id): Promise<IStateDocument | undefined> {
    const StateModel = await getStateModel();
    const doc: IStateDocument | null = await StateModel.findOne({ id });
    if (doc != null) {
      return doc;
    }
    return undefined;
  }

  async function insert(item: IStateItem): Promise<IStateDocument> {
    const StateModel = await getStateModel();
    const newDoc = new StateModel(item);
    return newDoc.save();
  }

  async function update(
    id: Id,
    properties: Partial<IStateProperties>
  ): Promise<IStateDocument | undefined> {
    const StateModel = await getStateModel();
    const updatedDoc: IStateDocument | null = await StateModel.findOneAndUpdate(
      { id },
      properties
    );
    if (updatedDoc != null) {
      return updatedDoc;
    }
    return undefined;
  }

  return Object.freeze({
    find,
    get,
    insert,
    update
  });
}
