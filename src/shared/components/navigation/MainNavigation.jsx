import { useState, useRef } from 'react';
import { Transition } from 'react-transition-group';
import MainHeader from './MainHeader';
import MenuToggler from './MenuToggler';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI/Backdrop';

const MainNavigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const SideDrawerRef = useRef();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* drawer */}
      <Transition in={isDrawerOpen} timeout={200} nodeRef={SideDrawerRef}>
        {(state) => (
          <div ref={SideDrawerRef}>
            <SideDrawer closeDrawer={closeDrawer} state={state} />
          </div>
        )}
      </Transition>
      {/* backdrop */}
      {isDrawerOpen && <Backdrop onClick={closeDrawer} />}
      {/* header */}
      <MainHeader>
        <MenuToggler openDrawer={openDrawer} />
        <Logo />
        <NavLinks />
      </MainHeader>
    </>
  );
};

export default MainNavigation;
