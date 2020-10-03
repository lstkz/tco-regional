import * as Rx from 'src/rx';
import { GlobalState, handle, GlobalActions } from './interface';
import { api } from 'src/services/api';

// --- Epic ---
handle
  .epic()
  .on(GlobalActions.$mounted, () => {
    return api
      .data_getLocations()
      .pipe(Rx.map(ret => GlobalActions.locationsLoaded(ret)));
  })
  .on(GlobalActions.setLocation, ({ location }) => {
    return api
      .data_getLocationData(location)
      .pipe(Rx.map(ret => GlobalActions.dataLoaded(ret)));
  });

// --- Reducer ---
const initialState: GlobalState = {
  location: '',
  locations: [],
  data: null,
};

handle
  .reducer(initialState)
  .on(GlobalActions.locationsLoaded, (state, { locations }) => {
    state.locations = locations;
  })
  .on(GlobalActions.setLocation, (state, { location }) => {
    state.location = location;
  })
  .on(GlobalActions.dataLoaded, (state, { data }) => {
    state.data = data;
  })
  .on(GlobalActions.resetLocation, state => {
    state.data = null;
    state.location = '';
  });

// --- Module ---
export function useGlobalModule() {
  handle();
}
