import styles from './index.module.less';
import { VscFolder, VscNewFile, VscFile, VscClose } from 'react-icons/vsc';

const Welcome = () => {
  return (
    <>
      <div className={styles['welcome-container']}>
        <div className={styles['welcome-container-title']}>MarkdownNote</div>
        <div className={styles['welcome-container-description']}>
          MarkdownNote is a simple markdown note-taking app.
        </div>
        <div className={styles['welcome-container-operate']}>
          <div className={styles['welcome-container-operate-item']}>
            <VscFolder /> <span>Open File or Folder</span>
          </div>
          <div className={styles['welcome-container-operate-item']}>
            <VscNewFile />
            <span>New Temporary File</span>
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
      </div>
    </>
  );
};

export default Welcome;
