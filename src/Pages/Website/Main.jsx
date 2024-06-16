import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Website/Header';
import Footer from '../../Components/Website/Footer';

const Main = () => {
    const[activename,setActiveName]=useState('Home');
    return (
       <>
       <Header />
       <Outlet activename={activename}/>
       <Footer />
       </>
    );
}

export default Main;
