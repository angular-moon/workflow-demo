export interface Apply {
  id?: string;
  catalog: {
    id?: string;
    name?: string;
  };
  budget?: number;
  agent?: string;
}

export interface ApplyServer {
  agentId?: string;
  agentName?: string;
  applyTime?: number;
  id?: string;
  money?: number;
  processId?: string;
  state?: string | number;
  stockDirId?: string;
  stockDirName?: string;
  stockOrgId?: string;
  stockOrgName?: string;
  stockUserId?: string;
  stockUserName?: string;
}
