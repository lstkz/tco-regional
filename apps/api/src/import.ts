import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { connect, disconnect } from './db';
import { CovidDataCollection } from './collections/CovidData';

async function importData() {
  await connect();
  const results: any[] = [];

  await new Promise(resolve => {
    fs.createReadStream(path.join(__dirname, '../../../covid-data.csv'))
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => {
        const stringProps = new Set<string>();
        stringProps.add('iso_code');
        stringProps.add('continent');
        stringProps.add('location');
        stringProps.add('date');
        results.forEach(item => {
          Object.keys(item).forEach(key => {
            if (!stringProps.has(key)) {
              item[key] = item[key] ? Number(item[key]) : null;
            } else if (key === 'date') {
              item[key] = new Date(item[key]);
            }
          });
        });
        resolve();
      });
  });

  await CovidDataCollection.deleteMany({});
  await CovidDataCollection.insertMany(results);
  await disconnect();
}

importData();
