import { List } from '@mui/material';
import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';



export const SelectorCriterios = () => {
    let infoCriterios = [
        {
            id: 0,
            nombre: "Lugares a visitar",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
            id: 1,
            nombre: "Distancia a recorrer",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
            id: 2,
            nombre: "Coste de la ruta",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
            id: 3,
            nombre: "Accesibilidad de la ruta",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        }
    ];
    let criteriosBuenosArray = [
        

    ];

    const [criterios, setCriterios] = React.useState(infoCriterios);
    const [criteriosBuenos, setCriteriosBuenos] = React.useState(criteriosBuenosArray);

    function handleOnDragEnd(result){
        // console.log(result);
        // if (!result.destination) return;
        // const items = Array.from(criterios);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);
        // setCriterios(items);

        // fucnion para pasar de una lista a otra y viceversa
        if (!result.destination) return;
        if (result.source.droppableId === result.destination.droppableId){
            if(result.source.droppableId === 'criteriosMalos'){
                const items = Array.from(criterios);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
                setCriterios(items);
            }else{
                const items = Array.from(criteriosBuenos);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
                setCriteriosBuenos(items);
            }
        }else{
            if(result.source.droppableId === 'criteriosMalos'){
                const items = Array.from(criterios);
                const [reorderedItem] = items.splice(result.source.index, 1);
                const items2 = Array.from(criteriosBuenos);
                items2.splice(result.destination.index, 0, reorderedItem);
                setCriterios(items);
                setCriteriosBuenos(items2);
            }else{
                const items = Array.from(criteriosBuenos);
                const [reorderedItem] = items.splice(result.source.index, 1);
                const items2 = Array.from(criterios);
                items2.splice(result.destination.index, 0, reorderedItem);
                setCriteriosBuenos(items);
                setCriterios(items2);
            }
        }

    }



  return (
    <div style={{display:'flex', margin: 'auto',justifyContent: 'center'}}>
        
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='board-left'>
                <h3>Criterios no seleccionados</h3>
            <Droppable droppableId="criteriosMalos" >
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef} sx={{
                        
                        
                        minHeight: '210px',
                        minWidth: '250px'
        
                    }}>
                        {criterios.map((criterio,index) => (
                            <Draggable key={criterio.id} draggableId={criterio.id.toString()} index={index}>
                                {(provided) => (
                                    <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  disablePadding sx={{
                                        //maxwidth 60% y margin auto para centrar
                                    
                                        margin: 'auto',
                                        marginBottom: '3%',
                                        // width: 'fit-content',
                                        //marin finito gris clarito
                                        border: '2px solid #e0e0e0',
                                        borderRadius: '5px',
                                        //padding 2% para que no quede pegado al borde
                                        padding: '0.5rem' ,
                                            backgroundColor: '#FFFFFF',
                                            minHeight: '70px'
                                    
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar alt={criterio.nombre} src={criterio.avatar} variant="square" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={criterio.nombre} sx={{
                                                //Solo ocupe el tamaño del texto de anchura
                                                width: 'fit-content'
                                            
                                            }}
                                        />
                                    </ListItem>
                                )}
                                
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                    
                )}
            </Droppable>
            </div>

            <div className='board-right'>
                <h3>Criterios de la Ruta</h3>
                <Droppable droppableId="criteriosBuenos">
                    {(provided) => (
                        <List {...provided.droppableProps} ref={provided.innerRef} sx={{
                            
                            minHeight: '210px',
                            minWidth: '250px'
                        
                        
                        }}>
                            {criteriosBuenos.map((criterio,index) => (
                                <Draggable key={criterio.id} draggableId={criterio.id.toString()} index={index}>
                                    {(provided) => (
                                        <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  disablePadding sx={{
                                            //maxwidth 60% y margin auto para centrar
                                        
                                            margin: 'auto',
                                            marginBottom: '3%',
                                            // width: 'fit-content',
                                            //marin finito gris clarito
                                            border: '3px solid #e0e0e0',
                                            borderRadius: '5px',
                                            //padding 2% para que no quede pegado al borde
                                            padding: '0.5rem' ,
                                            backgroundColor: '#FFFFFF',
                                            minHeight: '70px'
                                        
                                        }}>
                                            <ListItemAvatar>
                                                <Avatar alt={criterio.nombre} src={criterio.avatar} variant="square" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={criterio.nombre} sx={{
                                                    //Solo ocupe el tamaño del texto de anchura
                                                    width: 'fit-content'
                                                
                                                }}
                                            />
                                        </ListItem>
                                    )}

                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>

                    )}
                </Droppable>
            </div>
            
            <div style={{clear: 'both'}}></div>
            
        </DragDropContext>
    </div>
  )
}
