import { ValidateToken } from "./tokenHelper";

export interface CotterEventInterface {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  client_user_id: string;
  issuer: string;
  event: string;
  ip: string;
  location: string;
  timestamp: string;
  method: string;
  new: boolean;
  approved: boolean;
  signature: string;
}

export default class CotterEvent {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  client_user_id: string;
  issuer: string;
  event: string;
  ip: string;
  location: string;
  timestamp: string;
  method: string;
  new: boolean;
  approved: boolean;
  signature: string;

  constructor(eventToken: CotterEventInterface) {
    this.ID = eventToken.ID;
    this.CreatedAt = eventToken.CreatedAt;
    this.UpdatedAt = eventToken.UpdatedAt;
    this.DeletedAt = eventToken.DeletedAt;
    this.client_user_id = eventToken.client_user_id;
    this.issuer = eventToken.issuer;
    this.event = eventToken.event;
    this.ip = eventToken.ip;
    this.location = eventToken.location;
    this.timestamp = eventToken.timestamp;
    this.method = eventToken.method;
    this.new = eventToken.new;
    this.approved = eventToken.approved;
    this.signature = eventToken.signature;
  }

  validate(): boolean {
    var message = `${this.client_user_id}${this.issuer}${this.event}${this.timestamp}${this.method}${this.new}${this.approved}`;
    var signature = this.signature;

    return ValidateToken(message, signature);
  }
}
