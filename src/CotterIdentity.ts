import { ValidateToken } from "./tokenHelper";

export interface CotterIdentityInterface {
  identifier_id: string;
  expire_at: string;
  identifier: string;
  identifier_type: string;
  receiver: string;
  timestamp: string;
  signature: string;
}

export default class CotterIdentity {
  identifier_id: string;
  expire_at: string;
  identifier: string;
  identifier_type: string;
  receiver: string;
  timestamp: string;
  signature: string;

  constructor(identityToken: CotterIdentityInterface) {
    this.identifier_id = identityToken.identifier_id;
    this.expire_at = identityToken.expire_at;
    this.identifier = identityToken.identifier;
    this.identifier_type = identityToken.identifier_type;
    this.receiver = identityToken.receiver;
    this.timestamp = identityToken.timestamp;
    this.signature = identityToken.signature;
  }

  validate(): boolean {
    var message = `${this.identifier}${this.identifier_type}${this.receiver}${this.expire_at}`;
    var signature = this.signature;

    return ValidateToken(message, signature);
  }
}
