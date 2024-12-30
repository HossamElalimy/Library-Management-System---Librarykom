import { AppDispatch, RootState } from '../../../redux/ReduxStore';
import { useDispatch } from 'react-redux';

import { setDisplayLibraryCard } from '../../../redux/slices/ModalSlice';
import { Modal } from '../../../components';

export const LibraryCardModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  };

  return <Modal content={<Library Card Modal />} toggleModal={closeModal} />;
};
