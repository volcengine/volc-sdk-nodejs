import { Client } from "./Client";
import { ConsumerOptions } from "./types";
import { MQError } from "./utils/error";

export class Consumer {
  private _client: Client;

  constructor(client: Client, options: ConsumerOptions) {
    if (!client) {
      throw new MQError("Please pass the client instance of consumer");
    }
    if (!options) {
      throw new MQError("Please pass the options of consumer");
    }

    this._client = client;
    console.error(this._client);
  }
}
