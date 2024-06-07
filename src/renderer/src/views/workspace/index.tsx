import MarkdownEditor from '@renderer/components/markdown-editor';
import Catalogue from './components/catalogue';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { ResourceTypeEnum } from '@renderer/enums/common';
import EmptySvg from '@renderer/assets/images/empty.svg';

const WorkSpace = () => {
  const [currentWorkspaceNote, setCurrentWorkspaceNote] =
    useState<WorkspaceModel>({
      name: '',
      path: '',
      expand: false,
      type: ResourceTypeEnum.FILE,
      children: []
    });
  const [note, setNote] = useState<NoteModel>({
    name: '',
    content: '',
    path: ''
  });

  const handleLoadNoteContent = async () => {
    if (!currentWorkspaceNote?.path) {
      return;
    }
    const res = await window.api.readNote(currentWorkspaceNote?.path);
    if (!res) {
      return;
    }
    setNote(res);
  };

  const handleWhiteNoteToFile = async (info: NoteModel) => {
    if (!note.path) {
      return;
    }
    const res = await window.api.writeNote(info);
    if (res) {
      setNote(res);
    }
  };

  useEffect(() => {
    handleLoadNoteContent();
  }, [currentWorkspaceNote]);

  return (
    <>
      <div className={styles['work-space-container']}>
        <Catalogue
          currentWorkspaceNote={currentWorkspaceNote}
          onCurrentWorkspaceNoteChange={(current) =>
            setCurrentWorkspaceNote(current)
          }
        />
        <div className="h-full flex-1 flex justify-center items-center">
          {currentWorkspaceNote.path ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex-shrink-0 flex items-center justify-between py-3 px-1">
                <div
                  title={note.name}
                  className="font-bold overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {note.name}
                </div>
                <div
                  title={note.path}
                  className="text-sm overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {note.path}
                </div>
              </div>
              <MarkdownEditor
                value={note.content}
                onChange={(value: string) =>
                  handleWhiteNoteToFile({ ...note, content: value })
                }
                onSave={(value: string) =>
                  handleWhiteNoteToFile({ ...note, content: value })
                }
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img src={EmptySvg} alt="empty" className="size-60" />
              <div>Please select Note</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkSpace;
