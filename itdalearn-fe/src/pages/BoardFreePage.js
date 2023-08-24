import React from 'react';
import Footer from '../common/Footer';
import NavSetting from '../common/Nav';
import BoardFreeList from './BoardFreeList';

function BoardFreePage() {
    return (
        <div>
            <NavSetting />
            <BoardFreeList />
            <Footer />
        </div>
    );
}

export default BoardFreePage;
