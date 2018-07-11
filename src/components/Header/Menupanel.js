import React from 'react';
class MenuPanel extends React.Component {
    static defaultProps = {
      bsRole: 'menu',
      rootClose: true
    }
  
    render() {
      let { cn, className, rootClose, open, children, onClose, RootCloseWrapper, ...props } = this.props;
      cn = (className) => {return className}
      let menu = (
        <div
          {...props}
          className={cn(className, 'dropdown-menu')}
          onSelect={undefined}
        >
          {children}
        </div>
      );
  
      if (rootClose && open)
        return <RootCloseWrapper noWrap onRootClose={onClose}>{menu}</RootCloseWrapper>
  
      return menu
    }
  }
  
  export default MenuPanel;