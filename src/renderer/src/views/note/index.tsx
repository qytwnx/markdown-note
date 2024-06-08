import MarkdownEditor from '@renderer/components/markdown-editor';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { useRecentStore } from '@renderer/store';
import { useNavigate } from 'react-router-dom';
import { Box, LoadingOverlay } from '@mantine/core';

const Note = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentNote] = useRecentStore((state) => [
    state.currentNote,
    state.setCurrentNote
  ]);
  const [note, setNote] = useState<NoteModel>({
    name: '',
    path: '',
    content: ''
  });

  const handleLoadNoteContent = async () => {
    setLoading(true);
    if (!currentNote?.path) {
      navigate('/', { replace: true });
      return;
    }
    const res = await window.api.readNote(currentNote?.path);
    if (!res) {
      navigate('/', { replace: true });
      return;
    }
    setNote(res);
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
  }, [currentNote]);
  return (
    <>
      <Box pos="relative" className={styles['note-container']}>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'blue', type: 'bars' }}
        />
        <MarkdownEditor
          value={note.content}
          onChange={(value: string) =>
            handleWhiteNoteToFile({ ...note, content: value })
          }
          onSave={(value: string) =>
            handleWhiteNoteToFile({ ...note, content: value })
          }
        />
      </Box>
    </>
  );
};

export default Note;
