import Footer from '@renderer/components/footer';
import styles from './index.module.less';
import {
  VscFolder,
  VscNewFile,
  VscFile,
  VscClose,
  VscNewFolder
} from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useRecentStore } from '@renderer/store';
import { RecentTypeEnum } from '@renderer/enums/common';
import { useEffect } from 'react';
import EmptySvg from '@renderer/assets/images/empty.svg';

const Welcome = () => {
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useRecentStore((state) => [
    state.currentNote,
    state.setCurrentNote
  ]);
  const [recentNote, setRecentNote] = useRecentStore((state) => [
    state.recentNote,
    state.setRecentNote
  ]);

  const handleOpenNote = async () => {
    const res = await window.api.chooseFileMdContent();
    if (res) {
      const filter = recentNote.filter(
        (item) => item.type === RecentTypeEnum.NOTE && item.path === res.path
      );
      setCurrentNote({
        type: RecentTypeEnum.NOTE,
        name: res.name,
        path: res.path
      });
      if (filter === undefined || filter.length === 0) {
        setRecentNote([
          { type: RecentTypeEnum.NOTE, name: res.name, path: res.path },
          ...recentNote
        ]);
      }

      navigate('/note', { state: { note: res }, replace: true });
    }
  };

  const handleCreateNote = async () => {
    const res = await window.api.createFileMd('Untitled1.md');
    if (res) {
      const filter = recentNote.filter(
        (item) => item.type === RecentTypeEnum.NOTE && item.path === res.path
      );
      setCurrentNote({
        type: RecentTypeEnum.NOTE,
        name: res.name,
        path: res.path
      });
      if (filter === undefined || filter.length === 0) {
        setRecentNote([
          { type: RecentTypeEnum.NOTE, name: res.name, path: res.path },
          ...recentNote
        ]);
      }

      navigate('/note', { state: { note: res }, replace: true });
    }
  };

  const handleLoadCurrentNote = async () => {
    if (!currentNote) {
      return;
    }

    const res = await window.api.readFileMdContent(currentNote.path);
    console.log(res);
    if (!res) {
      setCurrentNote(undefined);
      return;
    }
    navigate('/note', { state: { note: res }, replace: true });
  };

  const handleOpenRecentNote = async (note: RecentModel) => {
    const res = await window.api.readFileMdContent(note.path);
    if (!res) {
      const filter =
        recentNote?.filter((item) => item.path !== note.path) || [];
      setRecentNote([...filter]);
      return;
    }
    navigate('/note', { state: { note: res }, replace: true });
  };

  useEffect(() => {
    handleLoadCurrentNote();
  }, []);

  return (
    <>
      <div className={styles['welcome-container']}>
        <div className={styles['welcome-container-title']}>MarkdownNote</div>
        <div className={styles['welcome-container-description']}>
          MarkdownNote is a simple markdown note-taking app.
        </div>
        <div className={styles['welcome-container-operate']}>
          <div className={styles['welcome-container-operate-item']}>
            <VscFolder /> <span>Open Work Space</span>
          </div>
          <div className={styles['welcome-container-operate-item']}>
            <VscNewFolder />
            <span>New Work Space</span>
          </div>
        </div>
        <div className={styles['welcome-container-operate']}>
          <div
            className={styles['welcome-container-operate-item']}
            onClick={() => handleOpenNote()}
          >
            <VscFile /> <span>Open Note</span>
          </div>
          <div
            className={styles['welcome-container-operate-item']}
            onClick={() => handleCreateNote()}
          >
            <VscNewFile />
            <span>New Note</span>
          </div>
        </div>
        <div className={styles['welcome-container-recent']}>
          <div className={styles['welcome-container-recent-title']}>
            Recent Notes
          </div>
          <div className={styles['welcome-container-recent-list']}>
            {recentNote?.length > 0 ? (
              recentNote?.map((item, index) => (
                <div
                  className={styles['welcome-container-recent-list-item']}
                  key={index}
                >
                  <div
                    className={
                      styles['welcome-container-recent-list-item-information']
                    }
                  >
                    {item?.type === RecentTypeEnum.WORK_SPACE ? (
                      <VscFolder
                        className={
                          styles[
                            'welcome-container-recent-list-item-information-icon'
                          ]
                        }
                      />
                    ) : (
                      <VscFile
                        className={
                          styles[
                            'welcome-container-recent-list-item-information-icon'
                          ]
                        }
                      />
                    )}
                    <div
                      className={
                        styles[
                          'welcome-container-recent-list-item-information-content'
                        ]
                      }
                    >
                      <div
                        className={
                          styles[
                            'welcome-container-recent-list-item-information-content-name'
                          ]
                        }
                        onClick={() => handleOpenRecentNote(item)}
                      >
                        {item?.name}
                      </div>
                      <div
                        className={
                          styles[
                            'welcome-container-recent-list-item-information-content-path'
                          ]
                        }
                      >
                        {item?.path}
                      </div>
                    </div>
                  </div>
                  <VscClose
                    className={
                      styles['welcome-container-recent-list-item-close']
                    }
                    onClick={() => {
                      const filter = recentNote?.filter(
                        (recent) => recent.path !== item.path
                      );
                      setRecentNote([...filter]);
                    }}
                  />
                </div>
              ))
            ) : (
              <img
                src={EmptySvg}
                alt="empty"
                className="w-full flex justify-center items-center size-36"
              />
            )}
          </div>
        </div>
        <div className={styles['welcome-container-footer']}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Welcome;
