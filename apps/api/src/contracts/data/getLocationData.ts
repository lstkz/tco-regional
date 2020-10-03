import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { CovidData } from 'shared';
import { CovidDataCollection } from '../../collections/CovidData';
import { renameId } from '../../common/helper';

export const getLocationData = createContract('data.getLocationData')
  .params('location')
  .schema({
    location: S.string(),
  })
  .returns<CovidData[]>()
  .fn(async location => {
    const items = await CovidDataCollection.find({
      location,
    }).toArray();

    return items.map(item => renameId(item));
  });

export const getLocationDataRpc = createRpcBinding({
  public: true,
  signature: 'data.getLocationData',
  handler: getLocationData,
});
