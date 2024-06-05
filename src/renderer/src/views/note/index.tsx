import MarkdownEditor from '@renderer/components/markdown-editor';
import styles from './index.module.less';

const Note = () => {
  return (
    <>
      <div className={styles['note-container']}>
        <MarkdownEditor />
      </div>
    </>
  );
};

export default Note;
