import StandardClaims from "./StandardClaims";
import CotterJwtToken from "./CotterJwtToken";

export interface CotterIDTokenInterface extends StandardClaims {
  client_user_id: string;
  auth_time: string;
  identifier: string;
  type: string;
}

export default class CotterIDToken extends CotterJwtToken {
  payload!: CotterIDTokenInterface;

  constructor(token: string) {
    super(token);
  }

  decodePayload(): CotterIDTokenInterface {
    var obj = super.decodePayload();
    return <CotterIDTokenInterface>obj;
  }

  getAuthTime(): string {
    return this.payload.auth_time;
  }

  getIdentifier(): string {
    return this.payload.identifier;
  }

  getID(): string {
    return this.payload.sub;
  }

  getClientUserID(): string {
    return this.payload.client_user_id;
  }
}
