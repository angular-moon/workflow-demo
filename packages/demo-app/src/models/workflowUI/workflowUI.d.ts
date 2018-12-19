export type Operation = {
  data?: {};
  name: string;
  opinion: 'NONE' | 'REQUIRE' | 'OPTIONAL';
};

export type WorkflowUI = {
  url: string | null;
  props?: {};
  operations: Operation[];
};
