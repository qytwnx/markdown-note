import styles from './index.module.less';
import LogoSvg from '@renderer/assets/images/logo.svg';
import { useAppStore } from '@renderer/store';
import { FaGithub } from 'react-icons/fa';
import { MdBrightnessHigh, MdBrightness4 } from 'react-icons/md';

const Header = () => {
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
        <img
          src={LogoSvg}
          alt="logo"
          className={styles['header-container-logo']}
        />
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