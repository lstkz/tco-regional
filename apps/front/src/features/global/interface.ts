import { createModule } from 'typeless';
import { GlobalSymbol } from './symbol';
import { CovidData } from 'shared';

// --- Actions ---
export const [handle, GlobalActions, getGlobalState] = createModule(
  GlobalSymbol
)
  .withActions({
    $mounted: null,
    setLocation: (location: string) => ({ payload: { location } }),
    locationsLoaded: (locations: string[]) => ({ payload: { locations } }),
    dataLoaded: (data: CovidData[]) => ({ payload: { data } }),
    resetLocation: null,
  })
  .withState<GlobalState>();

// --- Types ---
export interface GlobalState {
  location: string;
  locations: string[];
  data: CovidData[] | null;
}
