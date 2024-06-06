import MarkdownEditor from '@renderer/components/markdown-editor';
import styles from './index.module.less';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Note = () => {
  const [note, setNote] = useState<NoteModel>({
    name: '',
    path: '',
    content: ''
  });
  const location = useLocation();

  const handleWhiteNoteToFile = async (info: NoteModel) => {
    if (!note.path) {
      return;
    }
    const res = await window.api.writeFileMdContent(info);
    if (res) {
      setNote(res);
    }
  };

  const links = document.querySelectorAll('a[href]');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const url = link.getAttribute('href');
      if (url) {
        window.api.openExternal(url);
      }
    });
  });

  useEffect(() => {
    const { note } = location.state;
    setNote(note);
  }, [location.state.note]);
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
