import { Id, IStateEntity } from "../entity";
import { ISetStateItem, IStateModel } from "./state.model";

interface IBuildMakeStateProviderOptions {
  getStateModel: () => Promise<IStateModel>;
}

export interface IStateProvider {
  get(id: Id): Promise<IStateEntity | undefined>;
  list(conditions?: Partial<IStateEntity>): Promise<IStateEntity[]>;
  set(item: ISetStateItem): Promise<IStateEntity>;
}

export function makeStateProvider({
  getStateModel
}: IBuildMakeStateProviderOptions): IStateProvider {
  async function get(id: Id): Promise<IStateEntity | undefined> {
    return (await getStateModel()).get(id);
  }

  async function list(
    conditions?: Partial<IStateEntity>
  ): Promise<IStateEntity[]> {
    return (await getStateModel()).list(conditions);
  }

  async function set(item: ISetStateItem): Promise<IStateEntity> {
    return (await getStateModel()).set(item);
  }

  return Object.freeze({
    get,
    list,
    set
  });
}
