import { IpcMainInvokeEvent, app, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { handleCheckSameFile } from '../utils/file';

export default (): void => {
  ipcMain.handle(
    'upload:image',
    (_event: IpcMainInvokeEvent, file: { name: string; data: ArrayBuffer }) => {
      const fodlerPath = path.resolve(app.getPath('pictures'), 'MarkdownNote');
      if (!fs.existsSync(fodlerPath)) {
        fs.mkdirSync(fodlerPath);
      }
      let fileName = file.name.replaceAll(' ', '_');
      const fileData = new Uint8Array(file.data);
      console.log(fileData);
      if (fs.existsSync(path.resolve(fodlerPath, fileName))) {
        const sourceFileData = fs.readFileSync(
          path.resolve(fodlerPath, fileName)
        );
        if (handleCheckSameFile(sourceFileData, fileData)) {
          const returnFileName = path.basename(
            path.resolve(fodlerPath, fileName)
          );
          return {
            url: 'atom:///' + path.resolve(fodlerPath, fileName),
            alt: returnFileName,
            title: returnFileName
          } as UploadImageModel;
        } else {
          fileName =
            path.parse(fileName).name +
            '_' +
            Date.now() +
            path.parse(fileName).ext;
        }
      }
      fs.writeFileSync(path.resolve(fodlerPath, fileName), fileData);
      const returnFileName = path.basename(path.resolve(fodlerPath, fileName));
      return {
        url: 'atom:///' + path.resolve(fodlerPath, fileName),
        alt: returnFileName,
        title: returnFileName
      } as UploadImageModel;
    }
  );
};
