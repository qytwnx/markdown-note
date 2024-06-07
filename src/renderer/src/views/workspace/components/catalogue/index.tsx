import styles from './index.module.less';
import { VscNewFile, VscNewFolder } from 'react-icons/vsc';
import CatalogueItem from './catalogue-item';
import CatalogueCreateModal from './catalogue-create-modal';
import { useEffect, useState } from 'react';
import { ResourceTypeEnum } from '@renderer/enums/common';
import { useNavigate } from 'react-router-dom';
import { useRecentStore } from '@renderer/store';

interface Props {
  currentWorkspaceNote: WorkspaceModel;
  onCurrentWorkspaceNoteChange: (current: WorkspaceModel) => void;
}

const Catalogue = ({
  currentWorkspaceNote,
  onCurrentWorkspaceNoteChange
}: Props) => {
  const navigate = useNavigate();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [newResourceType, setNewResourceType] = useState<ResourceTypeEnum>(
    ResourceTypeEnum.FOLDER
  );
  const [workspaceInformation, setWorkspaceInformation] =
    useState<WorkspaceModel>({
      name: '',
      path: '',
      expand: false,
      type: ResourceTypeEnum.FOLDER,
      children: []
    });
  const [currentNote] = useRecentStore((state) => [
    state.currentNote,
    state.setCurrentNote
  ]);

  const handleLoadWorkspaceContent = async () => {
    if (!currentNote?.path) {
      navigate('/', { replace: true });
      return;
    }
    const res = await window.api.readWorkspace(currentNote?.path);
    if (!res) {
      navigate('/', { replace: true });
      return;
    }
    setWorkspaceInformation(res);
  };

  useEffect(() => {
    handleLoadWorkspaceContent();
  }, [currentNote]);

  return (
    <>
      <div className={styles['catalogue-container']}>
        <div className={styles['catalogue-container-operate']}>
          <VscNewFolder
            title="New Folder"
            className={styles['catalogue-container-operate-item']}
            onClick={() => {
              setNewResourceType(ResourceTypeEnum.FOLDER);
              setCreateModalVisible(true);
            }}
          />
          <VscNewFile
            title="New Note"
            className={styles['catalogue-container-operate-item']}
            onClick={() => {
              setNewResourceType(ResourceTypeEnum.FILE);
              setCreateModalVisible(true);
            }}
          />
        </div>
        <div className={styles['catalogue-container-list']}>
          {workspaceInformation?.children?.map(
            (item: WorkspaceModel, index: number) => (
              <CatalogueItem
                key={index}
                item={item}
                currentWorkspaceNote={currentWorkspaceNote}
                onCurrentWorkspaceNoteChange={onCurrentWorkspaceNoteChange}
                reload={() => handleLoadWorkspaceContent()}
              />
            )
          )}
        </div>
      </div>
      <CatalogueCreateModal
        modalVisible={createModalVisible}
        resourceType={newResourceType}
        basePath={workspaceInformation.path}
        onSubmit={() => {
          handleLoadWorkspaceContent();
          setCreateModalVisible(false);
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
    </>
  );
};

export default Catalogue;
