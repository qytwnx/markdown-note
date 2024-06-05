import styles from './index.module.less';
const PageLoading = () => {
  return (
    <div className={styles['page-loading-container']}>
      <div className={styles['page-loading-container-loader']}></div>
    </div>
  );
};

export default PageLoading;
