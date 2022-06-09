import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    }
});


export default function MovieDialog(props) {
  const { id, onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  /*
Dope👌
Sick🤟
So lovely😍
I am in tears😭
Hot🔥
I want to watch it again👌
Uplifting movie💯
So touching movie😢
Not that bad🙃
I do not remember😑
Boring as hell👎
Old as a living dinosaur🦖
Creepy as hell😶
Scary as hell🔪
Quite long movie😐
Regret watching😒
Waste of time😠
Garbage🗑
Sucks😡
  */
  return (
    <ThemeProvider theme={darkTheme}>
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>How was the movie?</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => handleListItemClick('1')} key={'1'}>
            <ListItemText primary='Dope👌' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('2')} key={'2'}>
            <ListItemText primary='Sick🤟' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('3')} key={'3'}>
            <ListItemText primary='So lovely😍' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('4')} key={'4'}>
            <ListItemText primary='I am in tears😭' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('5')} key={'5'}>
            <ListItemText primary='Hot🔥' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('6')} key={'6'}>
            <ListItemText primary='I want to watch it again👌' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('7')} key={'7'}>
            <ListItemText primary='Uplifting movie💯' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('8')} key={'8'}>
            <ListItemText primary='So touching movie😢' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('9')} key={'9'}>
            <ListItemText primary='Not that bad🙃' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('10')} key={'10'}>
            <ListItemText primary='I do not remember😑' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('11')} key={'11'}>
            <ListItemText primary='Boring as hell👎' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('12')} key={'12'}>
            <ListItemText primary='Old as a living dinosaur🦖' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('13')} key={'13'}>
            <ListItemText primary='Creepy as hell😶' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('14')} key={'14'}>
            <ListItemText primary='Scary as hell🔪' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('15')} key={'15'}>
            <ListItemText primary='Quite long movie😐' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('16')} key={'16'}>
            <ListItemText primary='Regret watching😒' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('17')} key={'17'}>
            <ListItemText primary='Waste of time😠' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('18')} key={'18'}>
            <ListItemText primary='Garbage🗑' />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('19')} key={'19'}>
            <ListItemText primary='Sucks😡' />
        </ListItem>
      </List>
    </Dialog>
    </ThemeProvider>
  );
}

MovieDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};