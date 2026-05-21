import classnames from 'classnames';
import styles from './index.module.scss';
import Icon from '@/components/Icon';
import { useNavigate } from "react-router-dom";

const NavBar = ({ className, children, extra, onLeftClick }) => {
    const navigate = useNavigate();
    const onLeftClick1 = () => {
        // if (typeof onLeftClick === 'function') {
        //     onLeftClick();
        //     return;
        // }
        navigate(-1);
    }
    
  return (
    <div className={classnames(styles.root, className)}>
      <div className='left' onClick={onLeftClick1}>
        <Icon type='icon-left1' />
      </div>
      <div className='title'>{children}</div>
      <div className='right'>
        {extra}
      </div>
    </div>
  )
};

export default NavBar;