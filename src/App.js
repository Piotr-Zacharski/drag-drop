import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

const mainTasks = [
{id: uuidv4(), content: 'Initial task'},
{id: uuidv4(), content: 'Second task'}
];

const mainColumns =
{
    [uuidv4()]: {
        name: 'Todo',
        items: mainTasks
    }
};

const onDragEnd = (result, columns, setColumns) => {
    if(!result.destination) return;
    const {source, destination} = result;
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
};



function App() {

    const [columns, setColumns] = useState(mainColumns);

  return (
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
              return(
                  <Droppable droppableId={id} key={id}>
                      {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                background: snapshot.isDraggingOver ? 'lightgreen' : 'lightgrey',
                                padding: 4,
                                width: 250,
                                minHeight: 500
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
                                                        backgroundColor: snapshot.isDragging ? 'lightpink' : 'lightblue',
                                                        color: 'white',
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
                  );
          })}
      </DragDropContext>
    </div>
  );
}

export default App;
