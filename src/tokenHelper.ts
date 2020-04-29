import { Buffer } from "buffer";
import { sign } from "tweetnacl";

const CotterPublicKey = "qqOaiQGjGsxBMgI5rdAasaACRiJthOqadmefjY5mS/c=";

export const ValidateToken = (message: string, signature: string): boolean => {
  const messageUint8 = new Uint8Array(Buffer.from(message, "utf8"));
  const signatureUint8 = new Uint8Array(Buffer.from(signature, "base64"));
  const pubKeyUint8 = new Uint8Array(Buffer.from(CotterPublicKey, "base64"));

  return sign.detached.verify(messageUint8, signatureUint8, pubKeyUint8);
};
