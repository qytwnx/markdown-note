import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { VscTrash, VscClose } from 'react-icons/vsc';
import { useRecentStore } from '@renderer/store';

const NoteOperate = () => {
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useRecentStore((state) => [
    state.currentNote,
    state.setCurrentNote
  ]);
  const [recentNote, setRecentNote] = useRecentStore((state) => [
    state.recentNote,
    state.setRecentNote
  ]);

  const handleRemove = async () => {
    if (!currentNote) {
      setCurrentNote(undefined);
      navigate('/', { replace: true });
      return;
    }
    const res = window.api.deleteNote(currentNote.path);
    if (!res) {
      return;
    }
    const filter = recentNote?.filter(
      (recent) => recent.path !== currentNote.path
    );
    setRecentNote([...filter]);
    setCurrentNote(undefined);
    navigate('/', { replace: true });
  };

  return (
    <>
      <div className={styles['note-operate-container']}>
        <div className={styles['note-operate-container-name']}>
          {currentNote?.name}
        </div>
        <div>(Auto Save)</div>
        <VscTrash
          className={styles['note-operate-container-remove']}
          onClick={() => handleRemove()}
        />
        <VscClose
          className={styles['note-operate-container-close']}
          onClick={() => {
            setCurrentNote(undefined);
            navigate('/', { replace: true });
          }}
        />
      </div>
    </>
  );
};

export default NoteOperate;
