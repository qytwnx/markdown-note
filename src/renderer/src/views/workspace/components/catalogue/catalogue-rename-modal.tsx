import { ResourceTypeEnum } from '@renderer/enums/common';
import styles from './index.module.less'; // 请替换为你的样式表路径
import { useEffect, useState } from 'react';

interface Props {
  modalVisible: boolean;
  resource: WorkspaceModel;
  onSubmit: (data: WorkspaceModel) => void;
  onCancel: () => void;
}

const CatalogueRenameModal = ({
  modalVisible,
  resource,
  onSubmit,
  onCancel
}: Props) => {
  const [resourceInformation, setResourceInformation] =
    useState<WorkspaceModel>({
      name: '',
      path: '',
      expand: false,
      type: ResourceTypeEnum.FILE,
      children: []
    });

  const handleRename = async () => {
    if (resourceInformation.name.trim().length === 0) {
      return;
    }
    const res = await window.api.renameNote(
      resource.path,
      resourceInformation.name.trim()
    );
    if (res) {
      const newResourcePath = resource.path.replace(
        `${resource.name}.md`,
        `${resourceInformation.name}.md`
      );
      const newResource = {
        ...resourceInformation,
        name: resourceInformation.name.trim(),
        path: newResourcePath
      } as WorkspaceModel;
      setResourceInformation({
        name: '',
        path: '',
        expand: false,
        type: ResourceTypeEnum.FILE,
        children: []
      });
      onSubmit(newResource);
    }
  };

  useEffect(() => {
    setResourceInformation(resource);
  }, [resource]);

  return (
    <>
      {modalVisible && (
        <div className={styles['catalogue-modal']}>
          <div className={styles['catalogue-modal-mask']}></div>
          <div className={styles['catalogue-modal-container']}>
            <div className={styles['catalogue-modal-container-header']}>
              <div className={styles['catalogue-modal-container-header-title']}>
                Rename
              </div>
              <div
                className={styles['catalogue-modal-container-header-operate']}
              >
                <button
                  className={
                    styles['catalogue-modal-container-header-operate-item']
                  }
                  onClick={() => handleRename()}
                >
                  Create
                </button>
                <button
                  className={
                    styles['catalogue-modal-container-header-operate-item']
                  }
                  onClick={() => {
                    setResourceInformation({
                      name: '',
                      path: '',
                      expand: false,
                      type: ResourceTypeEnum.FILE,
                      children: []
                    });
                    onCancel();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className={styles['catalogue-modal-container-content']}>
              <input
                className={styles['catalogue-modal-container-content-input']}
                type="text"
                placeholder="please input new name"
                autoFocus
                defaultValue={resourceInformation.name}
                onChange={(e) => {
                  setResourceInformation({
                    ...resourceInformation,
                    name: e.target.value
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogueRenameModal;
