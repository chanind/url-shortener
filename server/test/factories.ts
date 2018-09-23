import { factory, BookshelfAdapter } from 'factory-girl';
import Url from '../src/models/Url';

factory.setAdapter(new BookshelfAdapter());

factory.define('url', Url, {
  identifier: factory.sequence('Url.identifier', n => `ID${n}`),
  destination: factory.sequence('Url.destination', n => `http://url.com/blah${n}`),
});
