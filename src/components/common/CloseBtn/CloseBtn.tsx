import { CloseBtnProps } from '../../../types';
import './style.css';

const CloseBtn = ({ onClick }: CloseBtnProps) => (
  <i className="close-btn" onClick={onClick} />
);

export default CloseBtn;
