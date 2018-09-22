import * as config from './config';
import app from './app';

export default app.listen(config.get('port'), () => {
  // eslint-disable-next-line
  console.log(`running on ${config.get('port')}`);
});
