import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// interface IconProps {
//   type: string;
//   style?: React.CSSProperties;
//   className?: string;
// }

function Icon({type,  className = '', ...rest}) {
  return (
    <svg className={classNames('icon', className)} aria-hidden="true" {...rest}>
        <use xlinkHref={`#${type}`}></use>
      </svg>
  );
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
}


export default Icon;