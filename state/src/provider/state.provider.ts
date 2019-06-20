import { Id, IStateItem } from "../entity";
import { ISetStateItem, IStateModel } from "./state.model";

interface IBuildMakeStateProviderOptions {
  getStateModel: () => Promise<IStateModel>;
}

export interface IStateProvider {
  get(id: Id): Promise<IStateItem | undefined>;
  list(conditions?: Partial<IStateItem>): Promise<IStateItem[]>;
  set(item: ISetStateItem): Promise<IStateItem>;
}

export function makeStateProvider({
  getStateModel
}: IBuildMakeStateProviderOptions): IStateProvider {
  async function get(id: Id): Promise<IStateItem | undefined> {
    return (await getStateModel()).get(id);
  }

  async function list(conditions?: Partial<IStateItem>): Promise<IStateItem[]> {
    return (await getStateModel()).list(conditions);
  }

  async function set(item: ISetStateItem): Promise<IStateItem> {
    return (await getStateModel()).set(item);
  }

  return Object.freeze({
    get,
    list,
    set
  });
}
