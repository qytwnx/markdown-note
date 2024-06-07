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

  const handleOpenWorkspace = async () => {
    const res = await window.api.chooseWorkspace();
    if (!res) {
      return;
    }
    const filter = recentNote.filter((item) => item.path === res.path);
    setCurrentNote(res);
    if (filter === undefined || filter.length === 0) {
      setRecentNote([res, ...recentNote]);
    }
    navigate('/workspace', { replace: true });
  };

  const handleCreateWorkspace = async () => {
    const res = await window.api.createWorkspace();
    if (!res) {
      return;
    }
    const filter = recentNote.filter((item) => item.path === res.path);
    setCurrentNote(res);
    if (filter === undefined || filter.length === 0) {
      setRecentNote([res, ...recentNote]);
    }
    console.log(res);
    navigate('/workspace', { replace: true });
  };

  const handleOpenNote = async () => {
    const res = await window.api.chooseNote();
    if (!res) {
      return;
    }
    const filter = recentNote.filter((item) => item.path === res.path);
    setCurrentNote(res);
    if (filter === undefined || filter.length === 0) {
      setRecentNote([res, ...recentNote]);
    }
    navigate('/note', { replace: true });
  };

  const handleCreateNote = async () => {
    const res = await window.api.createNote('Untitled1.md');
    if (!res) {
      return;
    }
    setCurrentNote(res);
    const filter = recentNote.filter((item) => item.path === res.path);
    if (filter === undefined || filter.length === 0) {
      setRecentNote([res, ...recentNote]);
    }
    navigate('/note', { replace: true });
  };

  const handleLoadCurrentNote = async () => {
    if (!currentNote) {
      return;
    }
    if (RecentTypeEnum.NOTE === currentNote.type) {
      const res = await window.api.checkNoteExist(currentNote.path);
      if (!res) {
        setCurrentNote(undefined);
        return;
      }
      navigate('/note', { replace: true });
      return;
    } else if (RecentTypeEnum.WORKSPACE === currentNote.type) {
      const res = await window.api.checkWorkspaceExist(currentNote.path);
      if (!res) {
        setCurrentNote(undefined);
        return;
      }
      navigate('/workspace', { replace: true });
    }
  };

  const handleOpenRecentNote = async (recent: RecentModel) => {
    if (RecentTypeEnum.NOTE === recent.type) {
      const res = await window.api.checkNoteExist(recent.path);
      if (!res) {
        const filter =
          recentNote?.filter((item) => item.path !== recent.path) || [];
        setRecentNote([...filter]);
        return;
      }
      setCurrentNote(recent);
      navigate('/note', { replace: true });
    } else if (RecentTypeEnum.WORKSPACE === recent.type) {
      const res = await window.api.checkWorkspaceExist(recent.path);
      if (!res) {
        const filter =
          recentNote?.filter((item) => item.path !== recent.path) || [];
        setRecentNote([...filter]);
        return;
      }
      setCurrentNote(recent);
      navigate('/workspace', { replace: true });
    }
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
          <div
            className={styles['welcome-container-operate-item']}
            onClick={() => handleOpenWorkspace()}
          >
            <VscFolder /> <span>Open Work Space</span>
          </div>
          <div
            className={styles['welcome-container-operate-item']}
            onClick={() => handleCreateWorkspace()}
          >
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
                    {item?.type === RecentTypeEnum.WORKSPACE ? (
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
                        title={item?.path}
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
      </div>
    </>
  );
};

export default Welcome;
