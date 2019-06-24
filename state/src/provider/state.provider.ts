import { Id, IStateEntity } from "../entity";
import { IPatchStateItem, IStateModel } from "./state.model";

interface IBuildMakeStateProviderOptions {
  getStateModel: () => Promise<IStateModel>;
}

export interface IStateProvider {
  add(item: IStateEntity): Promise<IStateEntity>;
  get(id: Id): Promise<IStateEntity | undefined>;
  list(conditions?: Partial<IStateEntity>): Promise<IStateEntity[]>;
  patch(item: IPatchStateItem): Promise<IStateEntity | undefined>;
}

export function makeStateProvider({
  getStateModel
}: IBuildMakeStateProviderOptions): IStateProvider {
  async function add(item: IStateEntity): Promise<IStateEntity> {
    return (await getStateModel()).add(item);
  }

  async function get(id: Id): Promise<IStateEntity | undefined> {
    return (await getStateModel()).get(id);
  }

  async function list(
    conditions?: Partial<IStateEntity>
  ): Promise<IStateEntity[]> {
    return (await getStateModel()).list(conditions);
  }

  async function patch(
    item: IPatchStateItem
  ): Promise<IStateEntity | undefined> {
    return (await getStateModel()).patch(item);
  }

  return Object.freeze({
    add,
    get,
    list,
    patch
  });
}
