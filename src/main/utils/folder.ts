import fs from 'node:fs';
import path from 'node:path';
import { ResourceTypeEnum } from '../../renderer/src/enums/common';

export const handleCreateFolder = (folderPath: string): void => {
  if (fs.existsSync(folderPath)) {
    return;
  }
  fs.mkdirSync(folderPath);
};

export const handleGetFilesAndFolders = (
  folderPath: string
): WorkspaceModel => {
  if (!fs.statSync(folderPath).isDirectory()) {
    throw new Error('The provided path is not a directory');
  }
  const elements = fs.readdirSync(folderPath);
  const folderElements = elements.filter((element) =>
    fs.statSync(path.join(folderPath, element)).isDirectory()
  );
  const fileElements = elements.filter(
    (element) => !fs.statSync(path.join(folderPath, element)).isDirectory()
  );
  return {
    name: path.basename(folderPath),
    path: folderPath,
    type: ResourceTypeEnum.FOLDER,
    expand: false,
    children: [
      ...folderElements.flatMap((element) => {
        const fullPath = path.join(folderPath, element);
        return handleGetFilesAndFolders(fullPath);
      }),
      ...fileElements.flatMap((element) => {
        const fullPath = path.join(folderPath, element);
        if (path.extname(element) === '.md') {
          const name = path.basename(fullPath, '.md');
          return {
            name: name,
            path: fullPath,
            type: ResourceTypeEnum.FILE,
            expand: false,
            children: []
          };
        }
        return [];
      })
    ]
  };
};
