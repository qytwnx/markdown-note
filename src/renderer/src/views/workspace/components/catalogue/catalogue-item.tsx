import {
  VscFile,
  VscFolder,
  VscNewFile,
  VscNewFolder,
  VscTrash
} from 'react-icons/vsc';
import styles from './index.module.less';
import { ResourceTypeEnum } from '@renderer/enums/common';
import { useEffect, useState } from 'react';
import { useContextMenu } from 'mantine-contextmenu';

interface Props {
  item: WorkspaceModel;
  currentWorkspaceNote: WorkspaceModel;
  onCurrentWorkspaceNoteChange: (current: WorkspaceModel) => void;
}

const CatalogueItem = ({
  item,
  currentWorkspaceNote,
  onCurrentWorkspaceNoteChange
}: Props) => {
  const [data, setData] = useState<WorkspaceModel>({
    name: '',
    path: '',
    expand: false,
    type: ResourceTypeEnum.FOLDER,
    children: []
  });

  const { showContextMenu } = useContextMenu();

  const handleExpandFolder = (tree: WorkspaceModel) => {
    const handleExpandMatchingNodes = (param: WorkspaceModel): boolean => {
      if (param.path === currentWorkspaceNote.path) {
        return true;
      }
      for (const child of param.children) {
        if (handleExpandMatchingNodes(child)) {
          param.expand = true;
          return true;
        }
      }
      return false;
    };
    if (handleExpandMatchingNodes(tree)) {
      tree.expand = true;
    }
    setData(tree);
  };

  useEffect(() => {
    setData({ ...item });
    handleExpandFolder(item);
  }, [item]);

  return (
    <>
      <div className={styles['catalogue-container-list-item']}>
        <div
          className={[
            styles['catalogue-container-list-item-information'],
            data?.path === currentWorkspaceNote?.path ? styles['active'] : ''
          ].join(' ')}
          onContextMenu={showContextMenu(
            [
              {
                key: 'delete',
                icon: <VscTrash size={16} />,
                title: 'Delete',
                onClick: () => {
                  console.log('delete');
                }
              },
              {
                key: 'New Folder',
                icon: <VscNewFolder size={16} />,
                title: 'New Folder',
                onClick: () => {
                  console.log('New Folder');
                }
              },
              {
                key: 'New Note',
                icon: <VscNewFile size={16} />,
                title: 'New Note',
                onClick: () => {
                  console.log('New Note');
                }
              }
            ],
            { className: styles['context-menu'] }
          )}
          onClick={() => {
            if (data.type === ResourceTypeEnum.FOLDER) {
              setData({ ...data, expand: !data.expand });
            } else if (data.type === ResourceTypeEnum.FILE) {
              onCurrentWorkspaceNoteChange(data);
            }
          }}
        >
          {data.type === ResourceTypeEnum.FOLDER ? (
            <VscFolder
              className={
                styles['catalogue-container-list-item-information-icon']
              }
            />
          ) : (
            <VscFile
              className={
                styles['catalogue-container-list-item-information-icon']
              }
            />
          )}
          <div
            className={styles['catalogue-container-list-item-information-name']}
            title={data.name}
          >
            {data.name}
          </div>
        </div>
        {data.expand && data.children && data.children.length > 0 && (
          <div className={styles['catalogue-container-list-item-children']}>
            {data.children.map((child, index) => (
              <CatalogueItem
                key={index}
                item={child}
                currentWorkspaceNote={currentWorkspaceNote}
                onCurrentWorkspaceNoteChange={onCurrentWorkspaceNoteChange}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogueItem;
