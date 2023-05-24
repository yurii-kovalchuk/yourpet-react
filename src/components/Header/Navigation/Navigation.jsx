import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { AuthNav } from '../AuthNav/AuthNav';
import { NavBar } from '../MenuNav/Navlinks/NavBar/NavBar';
import { MobileNavBar } from '../MenuNav/MobileNavBar/MobileBar';
import { MobileBtn } from './Navigation.styled';

const DeviceSize = {
   mobile: 767,
   tablet: 992,
  mobileTablet:1279,
   desktop: 1280,
};

export const Navigation = () => {
  const [isOpen, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  return (
    <>
     
       <MobileBtn onClick={() => setOpen(!isOpen)}>
        {isOpen ? (
           <AiOutlineClose size={24} color="#FFC107" />
         ) : (
           <AiOutlineMenu size={24} color='#FFC107' />
        )}
       </MobileBtn>

       {isOpen && <MobileNavBar />}

      {!isMobile && <NavBar />}
      {!isMobile && <AuthNav />} 
    </>
  );
};
