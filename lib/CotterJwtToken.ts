import { Buffer } from "buffer";
import StandardClaims from "./StandardClaims";

class CotterJwtToken {
  token: string;
  payload: Object;
  constructor(token: string) {
    this.token = token;
    this.payload = this.decodePayload();
  }

  decodePayload(): Object {
    const payload = this.token.split(".")[1];
    try {
      var obj = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
      return obj;
    } catch (err) {
      return {};
    }
  }

  getExpiration(): number {
    var payload = <StandardClaims>this.payload;
    return payload.exp;
  }

  getIssuedAt(): number {
    var payload = <StandardClaims>this.payload;
    return payload.iat;
  }

  getAudience(): string {
    var payload = <StandardClaims>this.payload;
    return payload.aud;
  }
}

export default CotterJwtToken;
