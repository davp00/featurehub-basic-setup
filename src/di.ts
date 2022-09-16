import { FEATURE_CONFIG_API_KEY, FEATURE_CONFIG_API_URL } from './environment';
import { keys } from './featureConfig';
import { FeatureConfigReader } from './lib/FeatureConfig/FeatureConfigReader';

export const featureConfigReader = new FeatureConfigReader({
  keys,
  apiParams: {
    url: FEATURE_CONFIG_API_URL,
    apiKey: FEATURE_CONFIG_API_KEY,
  },
});
