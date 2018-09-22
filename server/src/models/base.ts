import createModelBase from 'bookshelf-modelbase';
import { toGlobalId, fromGlobalId } from 'graphql-relay';
import { registerRelayModel } from '../graphql/node';
import bookshelf from '../lib/database';

export const BaseModel = createModelBase(bookshelf).extend(
  {
    hasTimestamps: true,
    getRelayId() {
      return toGlobalId(this.constructor.relayName, this.get('id'));
    },
  },
  {
    // Override findOne from modelbase with require = false
    findOne(query, options) {
      const fetchOptions = Object.assign({ require: false }, options || {});
      return this.forge(query).fetch(fetchOptions);
    },
    async findByRelayId(relayId) {
      const { type, id } = fromGlobalId(relayId);
      if (this.relayName !== type) {
        return null;
      }
      return await this.findById(id);
    },
  },
);

export const createModel = (
  modelName: string,
  fields: { [key: string]: any },
  classFields: { [key: string]: any } = {},
) => {
  const modelClass = BaseModel.extend(fields, { modelName, ...classFields });
  modelClass.relayName = modelName;
  registerRelayModel(modelName, modelClass);
  return bookshelf.model(modelName, modelClass);
};
