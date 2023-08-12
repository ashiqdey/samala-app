import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// dnd
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

// @mui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// components
// import Image from '../components/micro/Image';
import ProductImage from '../components/micro/ProductImage';
// hooks
import useDnd from '../hooks/useDnd';
import useTransform from '../hooks/useTransform';
import DndItem from '../components/dnd/DndItem';

// -----------------------------------------------

const ReorderImages = ({ open, onClose, images, onDone }) => {
  const { transfromImage } = useTransform();
  const [items, setItems] = useState([]);
  const { handleDragStart, handleDragEnd, dragItem } = useDnd(items, setItems);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  useEffect(() => {
    const temp = images.map((e, i) => ({ id: i.toString(), image: transfromImage(e) }));
    setItems(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <Drawer
      anchor="bottom"
      open={!!open}
      onClose={onClose}
      PaperProps={{ elevation: 0, sx: { borderRadius: '20px 20px 0 0' } }}
    >
      <Box className="p-2">
        <Typography variant="h4">Re-order</Typography>
        <Typography variant="subtitle2">Hold and drag to re order</Typography>

        <Grid container spacing={2} className="product mt-1">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
              {items.map((item) => (
                <DndItem key={item.id} id={item.id}>
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                    <ProductImage src={item.image} />

                    {/* <Box className="img-wrap w-100 p-r">
                      <div className='img-holder p-r w-100 bg-white br-15'>
                        <Image
                          src={item.image}
                          className='p-a t-0 r-0 b-0 l-0 m-auto d-b'
                        />
                      </div>
                    </Box> */}
                  </Grid>
                </DndItem>
              ))}

              {/* this will be rendered when draging */}
              <DragOverlay>
                <Grid container>
                  {dragItem && (
                    <Grid item xs={12} sx={{ p: 1.5 }}>
                      <ProductImage src={dragItem.image} />
                      {/* <Box className="img-wrap w-100 p-r">
                        <div className='img-holder p-r w-100 bg-white br-15'>
                          <Image
                            src={dragItem.image}
                            className='p-a t-0 r-0 b-0 l-0 m-auto d-b'
                          />
                        </div>
                      </Box> */}
                    </Grid>
                  )}
                </Grid>
              </DragOverlay>
            </SortableContext>
          </DndContext>
        </Grid>

        <Stack direction="row" className="mt-3">
          <Button fullWidth color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth variant="contained" onClick={() => onDone(items)}>
            Done
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

ReorderImages.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  images: PropTypes.array,
  onDone: PropTypes.func,
};

export default ReorderImages;
