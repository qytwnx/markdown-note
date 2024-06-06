import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { VscClose } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import { useRecentStore } from '@renderer/store';

const NoteOperate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteModel>({
    name: '',
    path: '',
    content: ''
  });
  const setCurrentNote = useRecentStore((state) => state.setCurrentNote);

  useEffect(() => {
    const noteState = location.state?.note;
    if (noteState) {
      setNote(noteState);
    }
  }, [location.state?.note]);
  return (
    <>
      <div className={styles['note-operate-container']}>
        <div className={styles['note-operate-container-name']}>
          {note?.name}
        </div>
        <div>(Auto Save)</div>
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
