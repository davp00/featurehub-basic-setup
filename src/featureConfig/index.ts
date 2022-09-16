import {
  FeatureConfigKeysType,
  FeatureValueType,
} from '../lib/FeatureConfig/types';

export const enum KeysTest {
  TEST_KEY = 'TEST_KEY',
  TEST_KEY_2 = 'TEST_KEY_2',
}

export const keys: FeatureConfigKeysType = {
  [KeysTest.TEST_KEY]: FeatureValueType.JSON,
  [KeysTest.TEST_KEY_2]: FeatureValueType.BOOLEAN,
};
