import { IStateEntity, MakeStateEntity, State, Type } from "../entity";
import { IStateProvider } from "../provider";

interface IBuildUpdateState {
  makeState: MakeStateEntity;
  StateProvider: IStateProvider;
}

export type SetState = (
  id: string,
  type: Type,
  state: State
) => Promise<IStateEntity>;

export function buildSetState({
  makeState,
  StateProvider
}: IBuildUpdateState): SetState {
  return async function setState(
    id: string,
    type: Type,
    state: State
  ): Promise<IStateEntity> {
    const existingItem = (await StateProvider.get(id)) || {};

    const { id: _, ...properties } = makeState({
      ...existingItem,
      id,
      state,
      type
    });
    const updatedItem = await StateProvider.patch(id, properties);

    if (updatedItem !== undefined) {
      return updatedItem;
    } else {
      const newItem = makeState({ id, state, type });
      return StateProvider.add(newItem);
    }
  };
}
