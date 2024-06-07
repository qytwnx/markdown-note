type NoteModel = {
  name: string;
  content: string;
  path: string;
};

type WorkspaceModel = {
  name: string;
  path: string;
  expand: boolean;
  type: ResourceTypeEnum;
  children: Array<WorkspaceModel>;
};
