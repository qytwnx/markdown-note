import { ResourceTypeEnum } from '@renderer/enums/common';
import styles from './index.module.less'; // 请替换为你的样式表路径
import { useState } from 'react';

interface Props {
  modalVisible: boolean;
  resourceType: ResourceTypeEnum;
  basePath: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const CatalogueCreateModal = ({
  modalVisible,
  resourceType,
  basePath,
  onSubmit,
  onCancel
}: Props) => {
  const [name, setName] = useState<string>('');

  const handleCreate = async () => {
    if (name.trim().length === 0) {
      return;
    }
    if (ResourceTypeEnum.FILE === resourceType) {
      const res = await window.api.createNoteNoDialog(basePath, name.trim());
      if (res) {
        setName('');
        onSubmit();
      }
    }
    if (ResourceTypeEnum.FOLDER === resourceType) {
      const res = await window.api.createFolderNoDialog(basePath, name.trim());
      if (res) {
        setName('');
        onSubmit();
      }
    }
  };

  return (
    <>
      {modalVisible && (
        <div className={styles['catalogue-modal']}>
          <div className={styles['catalogue-modal-mask']}></div>
          <div
            className={styles['catalogue-modal-container']}
            onKeyUp={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                handleCreate();
              }
            }}
          >
            <div className={styles['catalogue-modal-container-header']}>
              <div className={styles['catalogue-modal-container-header-title']}>
                {ResourceTypeEnum.FILE === resourceType
                  ? 'New Note'
                  : 'New Folder'}
              </div>
              <div
                className={styles['catalogue-modal-container-header-operate']}
              >
                <button
                  className={
                    styles['catalogue-modal-container-header-operate-item']
                  }
                  onClick={() => handleCreate()}
                >
                  Create
                </button>
                <button
                  className={
                    styles['catalogue-modal-container-header-operate-item']
                  }
                  onClick={() => {
                    setName('');
                    onCancel();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className={styles['catalogue-modal-container-content']}>
              {ResourceTypeEnum.FILE === resourceType && (
                <input
                  className={styles['catalogue-modal-container-content-input']}
                  type="text"
                  placeholder="please input file name"
                  autoFocus
                  defaultValue={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              )}
              {ResourceTypeEnum.FOLDER === resourceType && (
                <input
                  className={styles['catalogue-modal-container-content-input']}
                  type="text"
                  placeholder="please input folder name"
                  autoFocus
                  defaultValue={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogueCreateModal;
