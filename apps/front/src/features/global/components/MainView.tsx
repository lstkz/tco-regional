import React from 'react';
import { useMappedState } from 'typeless';
import { useGlobalModule } from '../module';
import styled from 'styled-components';
import { getGlobalState } from '../interface';
import { LocationPicker } from './LocationPicker';
import { LocationInfo } from './LocationInfo';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
`;
const Title = styled.h1`
  text-align: center;
`;

export function MainView() {
  useGlobalModule();
  const { location } = useMappedState([getGlobalState], x => x);

  return (
    <Wrapper>
      <Title>{location ? `Is ${location} OK?` : 'Is My Country OK?'}</Title>
      {location ? <LocationInfo /> : <LocationPicker />}
    </Wrapper>
  );
}
