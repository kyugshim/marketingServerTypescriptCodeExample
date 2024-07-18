import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { JSONObject } from '../../../src/feedback/model/studentFeedback.model';

@Scalar('JSONObject', (_) => JSONObject)
// eslint-disable-next-line @typescript-eslint/ban-types
export class JSONObjectScalar implements CustomScalar<object, object> {
  description = 'JSONObject custom scalar type';

  // eslint-disable-next-line @typescript-eslint/ban-types
  parseValue(value: object): object {
    return value; // this is the value a client sends to the server
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  serialize(value: object): object {
    return value; // this is the value the server sends to the client
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
  parseLiteral(ast: any): object {
    if (ast.kind === Kind.OBJECT) {
      return new Object(ast.value);
    }
    return {};
  }
}
