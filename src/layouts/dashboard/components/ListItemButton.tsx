import React, { useState } from 'react';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Link from 'next/link';

type MenuOption = {
  title: string;
  icon?: JSX.Element;
  path: string;
  subItems?: null | MenuOption[];
};

const style = {
  selectedItem: {
    backgroundColor: '#E3F2FD',
    borderRadius: 1,
  },
  icon: {
    minWidth: '35px',
    '& svg': {
      color: '#2196F3',
    },
  },
};

const ListItem = ({ icon, title, path, subItems }: MenuOption) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const selected = router.pathname === path;
  console.log(router, path);

  const handleClick = () => {
    if (!!subItems) {
      setOpen(!open);
    } else {
      router.push(path);
    }
  };

  return (
    <>
      <ListItemButton sx={selected && style.selectedItem} onClick={handleClick}>
        <ListItemIcon sx={style.icon}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {!!subItems && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {!!subItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {subItems.map((value, i) => (
            <Link href={value.path}>
              <List component="a" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={value.title} />
                </ListItemButton>
              </List>
            </Link>
          ))}
        </Collapse>
      )}
    </>
  );
};
export default ListItem;
