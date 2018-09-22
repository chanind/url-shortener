import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { GraphQLObjectType } from 'graphql';

const queryNodeMapping = {};
const modelTypeMapping = {};

export const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    const modelClass = modelTypeMapping[type];
    if (modelClass) {
      const model = await modelClass.findOne({ id });
      if (model) {
        model.relayType = type;
        return model;
      }
    }
    return null;
  },
  obj => queryNodeMapping[obj.relayType],
);

export const registerRelayModel = (relayName: string, modelClass) => {
  modelTypeMapping[relayName] = modelClass;
};

export const registerQueryMapping = (query: GraphQLObjectType) => {
  queryNodeMapping[query.name] = query;
};
