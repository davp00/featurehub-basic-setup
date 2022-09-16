import {
  EdgeFeatureHubConfig,
  Readyness,
} from 'featurehub-javascript-node-sdk';
import { FeatureValueType } from './types/common';
import {
  FeatureConfigKeysType,
  FeatureConfigKeysValue,
  FeatureFlagReaderParams,
  InitiConfigReaderParams,
} from './types/FeatureConfigReader';
import { getConfigTypeMethod } from './utils/configType';

export class FeatureConfigReader {
  private readonly keysType: FeatureConfigKeysType;
  private readonly keysValue: FeatureConfigKeysValue;

  private readonly featureHubConfig: EdgeFeatureHubConfig;

  private isInitialized: boolean;

  constructor({ keys, apiParams }: FeatureFlagReaderParams) {
    this.keysType = keys;

    this.isInitialized = false;
    this.keysValue = {};

    this.featureHubConfig = new EdgeFeatureHubConfig(
      apiParams.url,
      apiParams.apiKey
    );
  }

  public getKeyValue<ReturnType = any>(key: string) {
    const isJson = this.keysType[key] === FeatureValueType.JSON;
    const value = this.keysValue[key];

    return (isJson ? JSON.parse(value as string) : value) as ReturnType;
  }

  public initConfigReader(params?: InitiConfigReaderParams): void {
    this.featureHubConfig.init();

    this.featureHubConfig.addReadynessListener(async (state) => {
      if (this.isInitialized) return;

      if (state !== Readyness.Ready) return;

      this.isInitialized = true;

      const featureHubClient = await this.featureHubConfig.newContext().build();

      Object.entries(this.keysType).forEach(([key, type]) => {
        const method = getConfigTypeMethod(type);
        this.keysValue[key] = featureHubClient[method](key);

        featureHubClient.feature(key).addListener((featureChanged) => {
          this.keysValue[key] = featureChanged[method]();
        });
      });

      if (params?.onInit) params.onInit();
    });
  }

  public close() {
    this.featureHubConfig.close();
  }
}
