import http from "http";

export type MQAgentOptions = http.AgentOptions;

export class MQAgent extends http.Agent {
  constructor(options: MQAgentOptions) {
    super(options);
  }
}
