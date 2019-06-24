import { IStateEntity } from "../entity";
import { IPatchStateProperties, IStateModel } from "./state.model";

interface IBuildMakeStateProviderOptions {
  getStateModel: () => Promise<IStateModel>;
}

export interface IStateProvider {
  add(item: IStateEntity): Promise<IStateEntity>;
  get(id: string): Promise<IStateEntity | undefined>;
  list(conditions?: Partial<IStateEntity>): Promise<IStateEntity[]>;
  patch(
    id: string,
    properties: IPatchStateProperties
  ): Promise<IStateEntity | undefined>;
}

export function makeStateProvider({
  getStateModel
}: IBuildMakeStateProviderOptions): IStateProvider {
  async function add(item: IStateEntity): Promise<IStateEntity> {
    return (await getStateModel()).add(item);
  }

  async function get(id: string): Promise<IStateEntity | undefined> {
    return (await getStateModel()).get(id);
  }

  async function list(
    conditions?: Partial<IStateEntity>
  ): Promise<IStateEntity[]> {
    return (await getStateModel()).list(conditions);
  }

  async function patch(
    id: string,
    properties: IPatchStateProperties
  ): Promise<IStateEntity | undefined> {
    return (await getStateModel()).patch(id, properties);
  }

  return Object.freeze({
    add,
    get,
    list,
    patch
  });
}
