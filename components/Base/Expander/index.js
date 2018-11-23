import React from 'react';
import cx from 'classnames';
import AnimateHeight from 'react-animate-height';

const Expander = ({children, isOpen, duration}) => (
  <AnimateHeight height={isOpen ? 'auto': 0} duration={duration}>{children}</AnimateHeight>
)

Expander.displayName = 'Base/Expander';

export default Expander;
