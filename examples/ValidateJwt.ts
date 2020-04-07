import * as axios from "axios";
import jwkToPem from "jwk-to-pem";
import * as jsonwebtoken from "jsonwebtoken";

const jwksPath = "/token/jwks";
const jwtAlgo = "ES256";

interface PublicKey {
  kty: string;
  crv: string;
  x: string;
  y: string;
  kid: string;
  use: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

let cacheKeys: MapOfKidToPublicKey | undefined;
const getPublicKeys = async (
  cotterBaseURL: string
): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cotterBaseURL}${jwksPath}`;
    const publicKeys = await axios.default.get<PublicKeys>(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = { instance: current, pem };
      return agg;
    }, {} as MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const ValidateToken = (
  cotterBaseURL: string,
  jwtKid: string,
  token: string
): boolean => {
  const jwtKeys = getPublicKeys(cotterBaseURL);
  const pubKey = jwtKeys[jwtKid];

  let errResp: any | undefined;
  jsonwebtoken.verify(token, pubKey.pem, { algorithms: [jwtAlgo] }, function (
    err: any
  ) {
    errResp = err;
  });
  if (errResp) {
    console.log(errResp);
    throw new Error("Access token is inavlid" + JSON.stringify(errResp));
  }
  return true;
};

export default ValidateToken;
