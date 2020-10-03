import * as Rx from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

// IMPORTS
import { CovidData, Foo } from './types';
// IMPORTS END

export class APIClient {
  constructor(
    private baseUrl: string,
    private getToken: () => string | null,
    private createXHR?: any
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  // SIGNATURES
  data_getLocationData(location: string): Rx.Observable<CovidData[]> {
    return this.call('data.getLocationData', { location });
  }
  data_getLocations(): Rx.Observable<string[]> {
    return this.call('data.getLocations', {});
  }
  example_createFoo(values: { foo: string }): Rx.Observable<Foo> {
    return this.call('example.createFoo', { values });
  }
  example_getAll(): Rx.Observable<Foo[]> {
    return this.call('example.getAll', {});
  }
  // SIGNATURES END
  private call(name: string, params: any): any {
    const token = this.getToken();
    const headers: any = {
      'content-type': 'application/json',
    };
    if (token) {
      headers['x-token'] = token;
    }
    const options: AjaxRequest = {
      url: `${this.baseUrl}/api/${name}`,
      method: 'POST',
      body: JSON.stringify(params),
      headers,
    };
    if (this.createXHR) {
      options.createXHR = this.createXHR;
    }
    return ajax(options).pipe(map(res => res.response));
  }
}
