import React from 'react';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

const Header = () => {
    return (
        <div style={{width: '100%',
                     height: '70px',
                     backgroundColor: '#34495e',
                     justifyContent: 'center',
                     display: 'flex'}}>
            <ViewKanbanIcon style={{width: '40px',
                     height: '40px',
                     marginTop: '15px',
                     marginRight: 7,
                     color: 'white'}}/>
            <h2 style={{textAlign: 'center', color: 'white'}}>
                <span>Drag'n'Drop Board</span>
            </h2>
        </div>
    );
};

export default Header;