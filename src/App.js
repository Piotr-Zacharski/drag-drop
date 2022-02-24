import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import {Paper} from "@mui/material";


const mainTasks = [
    {id: uuidv4(), content: 'Login page'},
    {id: uuidv4(), content: 'Auth'},
    {id: uuidv4(), content: 'Create form'},
    {id: uuidv4(), content: 'Handle tokens'}
];

const mainColumns =
{
    [uuidv4()]: {
        name: 'Todo',
        items: mainTasks
    },
    [uuidv4()]: {
        name: 'In Progress',
        items: []
    },
    [uuidv4()]: {
        name: 'Testing',
        items: []
    },
    [uuidv4()]: {
        name: 'Done',
        items: []
    },
};

const onDragEnd = (result, columns, setColumns) => {
    if(!result.destination) return;
    const {source, destination} = result;
    if(source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destinationItems = [...destinationColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destinationItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destinationColumn,
                items: destinationItems
            }
        })
    } else {
    const column = columns[source.droppableId];
    const copiedTasks = [...column.items];
    const [removed] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, removed);
    setColumns({
        ...columns,
        [source.droppableId]: {
            ...column,
            items: copiedTasks
        }
    });
    }
    
};


function App({ handleClick }) {
    const [columns, setColumns] = useState(mainColumns);
  return (
      <>
      <div style={{margin: 0, padding: 0}}>
          <Header />
      </div>
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
              return(
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <h3>{column.name}</h3>
                      <Paper style={{margin: 8, borderRadius: 8}} elevation={7}>
                  <Droppable droppableId={id} key={id}>
                      {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                background: snapshot.isDraggingOver ? '#7f8c8d' : '#bdc3c7',
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                                borderRadius: 7
                            }}>
                                {column.items.map((item, index) =>{
                                    return(
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) =>{
                                                return (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: 16,
                                                        margin: '0 0 8px 0',
                                                        minHeight: '50px',
                                                        backgroundColor: snapshot.isDragging ? '#8e44ad' : '#3498db',
                                                        color: '#ecf0f1',
                                                        fontWeight: 'bold',
                                                        borderRadius: 7,
                                                        ...provided.draggableProps.style
                                                    }}
                                                    >
                                                        {item.content}
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                      }}
                  </Droppable>
                  </Paper>
                  </div>
                  );
          })}
      </DragDropContext>
    </div>
          <div>
              <Form onSubmit={handleClick} />
          </div>
          <div>
              <Footer />
          </div>

      </>
  );
}

export default App;
