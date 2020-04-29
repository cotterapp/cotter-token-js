import StandardClaims from "./StandardClaims";
import CotterJwtToken from "./CotterJwtToken";

export interface CotterAccessTokenInterface extends StandardClaims {
  client_user_id: string;
  authentication_method: string;
  type: string;
  scope: string;
}

export default class CotterAccessToken extends CotterJwtToken {
  payload!: CotterAccessTokenInterface;

  constructor(token: string) {
    super(token);
  }

  decodePayload(): CotterAccessTokenInterface {
    var obj = super.decodePayload();
    return <CotterAccessTokenInterface>obj;
  }

  getAuthMethod(): string {
    return this.payload.authentication_method;
  }

  getScope(): string {
    return this.payload.scope;
  }

  getClientUserID(): string {
    return this.payload.client_user_id;
  }
}
