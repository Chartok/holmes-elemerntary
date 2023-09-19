// Import react
import React from 'react';

// Import ui/icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo'>Your Saved Books</span>
      </div>
      <hr />
      <div className='center'>
        <ul className='List'>
          <li className='ListItem'>
            <DashboardIcon className='icon' />
            <span className='ListItemText'>Dashboard</span>
          </li>
          <li className='ListItem'>
            <PersonIcon className='icon' />
            <span className='ListItemText'>Profile</span>
          </li>
          <li className='ListItem'>
            <SubjectIcon className='icon' />
            <span className='ListItemText'>Library</span>
          </li>
          <li className='ListItem'>
            <ChangeCircleIcon className='icon' />
            <span className='ListItemText'>History</span>
          </li>
          <li className='ListItem'>
            <SettingsIcon className='icon' />
            <span className='ListItemText'>Settings</span>
          </li>
          <li className='ListItem'>
            <LogoutIcon className='icon' />
            <span className='ListItemText'>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
