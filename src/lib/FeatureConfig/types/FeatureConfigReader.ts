import { FeatureValueType } from './common';

export type FeatureConfigKeysType = { [key: string]: FeatureValueType };
export type FeatureConfigKeysValue = { [key: string]: unknown };
export type ApiParams = {
  url: string;
  apiKey: string;
};

export interface FeatureFlagReaderParams {
  keys: FeatureConfigKeysType;
  apiParams: ApiParams;
}

export interface InitiConfigReaderParams {
  onInit?: () => void;
}
