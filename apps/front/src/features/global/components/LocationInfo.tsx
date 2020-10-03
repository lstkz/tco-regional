import * as React from 'react';
import styled from 'styled-components';
import { useMappedState, useActions } from 'typeless';
import { getGlobalState, GlobalActions } from '../interface';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

interface LocationInfoProps {
  className?: string;
}

const LoaderWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Result = styled.div`
  font-size: 45px;
  color: #dd0000;
  text-align: center;
  margin: 20px;
`;

const List = styled.ul`
  font-size: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Footer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
  button {
    font-size: 20px;
  }
`;

const _LocationInfo = (props: LocationInfoProps) => {
  const { className } = props;
  const { resetLocation } = useActions(GlobalActions);
  const { data } = useMappedState([getGlobalState], x => x);

  const renderContent = () => {
    if (!data) {
      return (
        <LoaderWrapper>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={0}
          />
        </LoaderWrapper>
      );
    }
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const filtered = data.filter(
      x => new Date(x.date).getTime() > lastWeek.getTime()
    );
    let newCases = 0;
    let newDeaths = 0;
    let newTests = 0;

    filtered.forEach(item => {
      if (item.new_cases) {
        newCases += item.new_cases_per_million;
      }
      if (item.new_deaths) {
        newDeaths += item.new_deaths_per_million;
      }
      if (item.new_tests) {
        newTests += item.new_tests_per_thousand;
      }
    });

    let score = 0;
    let warnings: string[] = [];
    let errors: string[] = [];
    if (newCases > 200) {
      score += 10;
      errors.push('Big increase in new cases');
    } else if (newCases > 100) {
      score += 5;
      warnings.push('Average increase in new cases');
    }
    if (newDeaths > 3) {
      score += 10;
      errors.push('Too many deaths');
    } else if (newDeaths > 0.5) {
      score += 5;
      warnings.push('Many deaths');
    }

    if (!newTests) {
      score += 100;
      errors.push('NO TESTS!!!');
    } else if (newTests < 5) {
      score += 5;
      warnings.push('Small number of tests');
    }

    const stats = (
      <div>
        Cases last week: {newCases} per million
        <br />
        Deaths last week: {newDeaths} per million
        <br />
        Tests last week: {newTests} per thousand
        <br />
      </div>
    );

    const footer = (
      <Footer>
        <button onClick={resetLocation}>reset</button>
      </Footer>
    );

    if (!score) {
      return (
        <div>
          {stats}
          <Result style={{ color: '#00dd00' }}> 🥰 OK 🥰</Result>
          {footer}
        </div>
      );
    }
    return (
      <div>
        {stats}
        <Result style={{ color: '#dd0000' }}>😵 NOT OK 😵</Result>
        {errors.length > 0 && (
          <List>
            {errors.map((item, i) => (
              <li key={i}>❗❗❗ {item}</li>
            ))}
          </List>
        )}
        {warnings.length > 0 && (
          <List>
            {warnings.map((item, i) => (
              <li key={i}>❗ {item}</li>
            ))}
          </List>
        )}
        {footer}
      </div>
    );
  };

  return <div className={className}>{renderContent()}</div>;
};

export const LocationInfo = styled(_LocationInfo)`
  display: block;
`;
