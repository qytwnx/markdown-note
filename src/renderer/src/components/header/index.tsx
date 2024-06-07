import styles from './index.module.less';
import LogoSvg from '@renderer/assets/images/logo.svg';
import { useAppStore } from '@renderer/store';
import { FaGithub } from 'react-icons/fa';
import { MdBrightnessHigh, MdBrightness4 } from 'react-icons/md';
import NoteOperate from './note-operate';
import WorkspaceOperate from './workspace-operate';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useAppStore((state) => [
    state.isDark,
    state.setIsDark
  ]);

  const handleThemeDarkToggle = async (mode: 'light' | 'dark') => {
    const status = await window.api.themeDarkToggle(mode);
    setIsDark(status);
  };

  return (
    <>
      <div className={styles['header-container']}>
        <div className={styles['header-container-information']}>
          <img
            src={LogoSvg}
            alt="logo"
            className={styles['header-container-information-logo']}
          />
          {location.pathname === '/note' && <NoteOperate />}
          {location.pathname === '/workspace' && <WorkspaceOperate />}
        </div>
        <div className={styles['header-container-operate']}>
          <FaGithub
            className={styles['header-container-operate-item']}
            onClick={() => window.api.openExternal('https://github.com/qytwnx')}
          />
          {isDark ? (
            <MdBrightnessHigh
              className={styles['header-container-operate-item']}
              onClick={() => handleThemeDarkToggle('light')}
            />
          ) : (
            <MdBrightness4
              className={styles['header-container-operate-item']}
              onClick={() => handleThemeDarkToggle('dark')}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
