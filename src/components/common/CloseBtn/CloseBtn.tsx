import { CloseBtnProps } from '@/config/types';

import styles from './style.module.css';

const CloseBtn = ({ onClick }: CloseBtnProps) => (
  <i className={styles.closeBtn} onClick={onClick} />
);

export default CloseBtn;
