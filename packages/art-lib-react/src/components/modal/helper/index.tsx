import React from 'react';
import { render } from 'react-dom';
const modals = {};

const getMountNode = (ModalComponent, isOpenStatus) => {
  const uuid = ModalComponent && ModalComponent.uuid;
  if (!uuid) {
    throw new Error(`wrapper modal using core/component/uuidWrapper()!`);
  }
  if (!modals[uuid]) {
    if (isOpenStatus === true) {
      const node = document.createElement('div');
      modals[uuid] = node;
      modals[uuid].uuid = uuid;
    } else {
      console.warn('make sure modal opened using `modalOpen(ModalComponent)');
    }
  }
  console.log('opened modals: ', modals);
  return modals[uuid];
};

const close = (modalNode) => () => {
  if (modalNode) {
    if (modalNode.modal) {
      modalNode.modal.destroy(function () {
        // render(null as any, modalNode);
        modals[modalNode.uuid] = null;
        delete modals[modalNode.uuid];
      });
    } else {
      render(null as any, modalNode);
      modals[modalNode.uuid] = null;
      delete modals[modalNode.uuid];
    }
  }
  console.log('closed modals: ', modals);
};

export const showModal = (ModalComponent, props) => {
  const mountNode = getMountNode(ModalComponent, true);
  render(
    <ModalComponent {...props} isOpen={true}
      onModalReady={(modal) => {
        mountNode.modal = modal;
      }} />,
    mountNode
  );
  return { close: close(mountNode), instance: ModalComponent };
};

export const closeModal = (ModalComponent) => {
  close(getMountNode(ModalComponent, false))();
};

export const closeModalAll = () => {
  Object.keys(modals).forEach((uuid) => {
    close(modals[uuid])();
  });
};