import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';


function useDnd(items, setItems) {
  const [dragItem, setDragItem] = useState(null);

  const handleDragStart = (event) => {
    // find the object with id === draging item id
    const dragItem = items.find(e => e.id === event.active.id);
    setDragItem(dragItem);
  };

  const handleDragEnd = ({ active, over }) => {
    setDragItem(null);

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  };

  return {
    handleDragStart, handleDragEnd, dragItem
  };
}

export default useDnd;