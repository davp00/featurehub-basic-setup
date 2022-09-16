import express from 'express';
import { featureConfigReader } from './di';
import { KeysTest } from './featureConfig';

const app = express();

app.get('/', function (req, res) {
  res.send({
    [KeysTest.TEST_KEY]: featureConfigReader.getKeyValue(KeysTest.TEST_KEY),
    [KeysTest.TEST_KEY_2]: featureConfigReader.getKeyValue(KeysTest.TEST_KEY_2),
  });
});

featureConfigReader.initConfigReader({
  onInit: () => {
    console.log('App listen in port: 3000');
    app.listen(3000, () => {
      featureConfigReader.close();
    });
  },
});
