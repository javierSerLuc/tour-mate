import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';

export const ListaRuta = ({pois,setPoiSeleccionado}) => {
  return (
    <div>
        <List>
            {pois.map((poi,index) => (
                <ListItemButton key={index} onClick={() => setPoiSeleccionado(index)}>
                    <ListItemText primary={poi.nombre} />
                </ListItemButton>
            ))}
        </List>
    </div>
  )
}
