import PropTypes from 'prop-types';
import React, { cloneElement } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const DndItem = ({
  id,
  children,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.6 : 1
  };


  return (
    <>
      {cloneElement(children, {
        ...listeners,
        ...attributes,
        ref: setNodeRef,
        style,
      })}
    </>
  )
}

export default DndItem;

DndItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};