import styles from './index.module.less';
import Config from '../../../../../package.json';

const Footer = () => {
  return (
    <>
      <footer className={styles['footer-container']}>
        <span>Version: {Config.version}</span>
        <span>Copyright © 2024 - All right reserved by QYT-WNX</span>
      </footer>
    </>
  );
};

export default Footer;
