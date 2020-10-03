export interface Foo {
  id: string;
  foo: string;
  bar: string;
}

export interface CovidData {
  id: string;

  iso_code: string;
  continent: string;

  location: string;

  date: Date;

  total_cases: number;

  new_cases: number;

  new_cases_smoothed: number;

  total_deaths: number;

  new_deaths: number;

  new_deaths_smoothed: number;

  total_cases_per_million: number;

  new_cases_per_million: number;

  new_cases_smoothed_per_million: number;

  total_deaths_per_million: number;

  new_deaths_per_million: number;

  new_deaths_smoothed_per_million: number;

  new_tests: number;

  total_tests: number;

  total_tests_per_thousand: number;

  new_tests_per_thousand: number;

  new_tests_smoothed: number;

  new_tests_smoothed_per_thousand: number;

  tests_per_case: number;

  positive_rate: number;

  tests_units: number;

  numberency_index: number;

  population: number;

  population_density: number;

  median_age: number;

  aged_65_older: number;

  aged_70_older: number;

  gdp_per_capita: number;

  extreme_poverty: number;

  cardiovasc_death_rate: number;

  diabetes_prevalence: number;

  female_smokers: number;

  male_smokers: number;

  handwashing_facilities: number;

  hospital_beds_per_thousand: number;

  life_expectancy: number;

  human_development_index: number;
}
