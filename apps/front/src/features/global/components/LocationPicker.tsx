import * as React from 'react';
import styled from 'styled-components';

import Select from 'react-select';
import { getGlobalState, GlobalActions } from '../interface';
import { useMappedState, useActions } from 'typeless';

interface LocationPickerProps {
  className?: string;
}

const _LocationPicker = (props: LocationPickerProps) => {
  const { className } = props;
  const { locations } = useMappedState([getGlobalState], x => x);
  const { setLocation } = useActions(GlobalActions);
  const options = React.useMemo(
    () => locations.map(item => ({ value: item, label: item })),
    [locations]
  );

  return (
    <div className={className}>
      <h2>Choose your location:</h2>
      <Select
        options={options}
        onChange={(option: any) => setLocation(option.value)}
      />
    </div>
  );
};

export const LocationPicker = styled(_LocationPicker)`
  display: block;
`;
