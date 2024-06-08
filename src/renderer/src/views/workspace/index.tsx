import MarkdownEditor from '@renderer/components/markdown-editor';
import Catalogue from './components/catalogue';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { ResourceTypeEnum } from '@renderer/enums/common';
import EmptySvg from '@renderer/assets/images/empty.svg';
import { Box, LoadingOverlay } from '@mantine/core';

const WorkSpace = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    if (!currentWorkspaceNote?.path) {
      setNote({
        name: '',
        content: '',
        path: ''
      });
      setLoading(false);
      return;
    }
    const res = await window.api.readNote(currentWorkspaceNote?.path);
    if (!res) {
      setNote({
        name: '',
        content: '',
        path: ''
      });
      setLoading(false);
      return;
    }
    setNote({ ...res });
    setLoading(false);
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
        <Box pos="relative" className={styles['work-space-container-main']}>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'blue', type: 'bars' }}
          />
          {currentWorkspaceNote?.path && note?.path && !loading ? (
            <div className={styles['work-space-container-main-editor']}>
              <div
                className={styles['work-space-container-main-editor-header']}
              >
                <div
                  title={note.name}
                  className={
                    styles['work-space-container-main-editor-header-name']
                  }
                >
                  {note.name}
                </div>
                <div
                  title={note.path}
                  className={
                    styles['work-space-container-main-editor-header-path']
                  }
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
            <div className={styles['work-space-container-main-empty']}>
              <img src={EmptySvg} alt="empty" className="size-60" />
              <div>Please select Note</div>
            </div>
          )}
        </Box>
      </div>
    </>
  );
};

export default WorkSpace;
