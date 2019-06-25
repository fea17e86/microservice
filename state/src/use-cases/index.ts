import { makeState } from "../entity";
import { StateProvider } from "../provider";
import { buildSetState } from "./set-state.use-case";

export const setState = buildSetState({ makeState, StateProvider });

export default Object.freeze({ setState });
