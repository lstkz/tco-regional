import { createContract, createRpcBinding } from '../../lib';
import { CovidDataCollection } from '../../collections/CovidData';

export const getLocations = createContract('data.getLocations')
  .params()
  .returns<string[]>()
  .fn(async () => {
    return CovidDataCollection.distinct('location', {}, {});
  });

export const getLocationsRpc = createRpcBinding({
  injectUser: false,
  public: true,
  signature: 'data.getLocations',
  handler: getLocations,
});
