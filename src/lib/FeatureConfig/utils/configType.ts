import { FeatureValueType } from '../types/common';

const configTypeMethod: { [key: string]: string } = {
  [FeatureValueType.BOOLEAN]: 'getBoolean',
  [FeatureValueType.NUMBER]: 'getNumber',
  [FeatureValueType.STRING]: 'getString',
  [FeatureValueType.JSON]: 'getRawJson',
};

export const getConfigTypeMethod = (type: FeatureValueType) =>
  configTypeMethod[type];
