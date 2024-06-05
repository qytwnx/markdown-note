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

const Welcome = () => {
  const navigate = useNavigate();

  const handleOpenNote = async () => {
    const content = await window.api.chooseFileMdContent();
    console.log(content);
    if (content) {
      navigate('/note', { state: { content } });
    }
  };

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
          <div className={styles['welcome-container-operate-item']}>
            <VscNewFile />
            <span>New Note</span>
          </div>
        </div>
        <div className={styles['welcome-container-recent']}>
          <div className={styles['welcome-container-recent-title']}>
            Recent Notes
          </div>
          <div className={styles['welcome-container-recent-list']}>
            <div className={styles['welcome-container-recent-list-item']}>
              <div
                className={
                  styles['welcome-container-recent-list-item-information']
                }
              >
                <VscFolder
                  className={
                    styles[
                      'welcome-container-recent-list-item-information-icon'
                    ]
                  }
                />
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
                  >
                    markdown-note
                  </div>
                  <div
                    className={
                      styles[
                        'welcome-container-recent-list-item-information-content-path'
                      ]
                    }
                  >
                    D:\QY_Project\2024\markdown-note
                  </div>
                </div>
              </div>
              <VscClose
                className={styles['welcome-container-recent-list-item-close']}
              />
            </div>
            <div className={styles['welcome-container-recent-list-item']}>
              <div
                className={
                  styles['welcome-container-recent-list-item-information']
                }
              >
                <VscFile
                  className={
                    styles[
                      'welcome-container-recent-list-item-information-icon'
                    ]
                  }
                />
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
                  >
                    markdown-note
                  </div>
                  <div
                    className={
                      styles[
                        'welcome-container-recent-list-item-information-content-path'
                      ]
                    }
                  >
                    D:\QY_Project\2024\markdown-note66666666666666666666
                  </div>
                </div>
              </div>
              <VscClose
                className={styles['welcome-container-recent-list-item-close']}
              />
            </div>
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
