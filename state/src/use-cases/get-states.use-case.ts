import { IStateEntity, MakeStateEntity, State, Type } from "../entity";
import { IStateProvider } from "../provider";

interface IBuildGetStates {
  makeState: MakeStateEntity;
  StateProvider: IStateProvider;
}

interface IGetStatesConditions {
  state?: State;
  type?: Type;
}

export type GetStates = (
  conditions?: IGetStatesConditions
) => Promise<IStateEntity[]>;

export function buildGetStates({
  makeState,
  StateProvider
}: IBuildGetStates): GetStates {
  return async function getStates(
    conditions?: IGetStatesConditions
  ): Promise<IStateEntity[]> {
    const items = (await StateProvider.list(conditions)).map(item => {
      try {
        return makeState(item);
      } catch (e) {
        return null;
      }
    });

    const validEntities: IStateEntity[] = items.filter(
      item => item != null
    ) as IStateEntity[];

    return validEntities;
  };
}
