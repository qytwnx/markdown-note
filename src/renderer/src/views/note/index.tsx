import MarkdownEditor from '@renderer/components/markdown-editor';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { useRecentStore } from '@renderer/store';
import { useNavigate } from 'react-router-dom';

const Note = () => {
  const navigate = useNavigate();
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
      <div className={styles['note-container']}>
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
    </>
  );
};

export default Note;
