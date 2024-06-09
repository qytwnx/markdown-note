import styles from './index.module.less';
import Config from '../../../../../package.json';

const Footer = () => {
  return (
    <>
      <footer className={styles['footer-container']}>
        v{Config.version} Copyright © 2024 - All right reserved by QYT-WNX
      </footer>
    </>
  );
};

export default Footer;
