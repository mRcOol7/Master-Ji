import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconButton, Menu, MenuItem, ListItemText } from '@mui/material';
import { MoreVert as MoreVertIcon, ArrowUpward, ArrowDownward, Delete } from '@mui/icons-material';
import './ManageBundle.css';

const initialItems = [
  {
    id: '1',
    title: 'Interview preparation with JavaScript 2.0',
    price: 'Rs. 9000/-',
    type: 'Course',
    image: '/images/interview_prep_image.jpg'
  },
  {
    id: '2',
    title: 'Aptitude - Averages, Mixtures & Allegation',
    price: 'Free',
    type: 'Mock Test',
    image: '/images/averages_image.jpg'
  },
  {
    id: '3',
    title: 'Aptitude - Simple & Compound Interest',
    price: 'Free',
    type: 'Mock Test',
    image: '/images/interest_image.jpg'
  },
  {
    id: '4',
    title: 'Aptitude - Partnership',
    price: 'Free',
    type: 'Mock Test',
    image: '/images/partnership_image.jpg'
  },
  {
    id: '5',
    title: 'Aptitude - Time & Work',
    price: 'Free',
    type: 'Mock Test',
    image: '/images/time_work_image.jpg'
  },
];

const ManageBundle = () => {
  const [items, setItems] = useState(initialItems);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    
    setItems(reorderedItems);
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === 'Move To Top') moveToTop(menuIndex);
    if (action === 'Move To Bottom') moveToBottom(menuIndex);
    if (action === 'Remove') removeItem(menuIndex);
    handleClose();
  };

  const moveToTop = (index) => {
    if (index === 0) return;
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(index, 1);
    reorderedItems.unshift(removed);
    setItems(reorderedItems);
  };

  const moveToBottom = (index) => {
    if (index === items.length - 1) return;
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(index, 1);
    reorderedItems.push(removed);
    setItems(reorderedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="manage-bundle">
      <h2>Manage Bundle</h2>
      <p>Change orders of the products based on priority</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="bundle-list">
          {(provided) => (
            <div
              className="bundle-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="bundle-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={item.image} alt={item.title} className="item-image" />
                      <div className="item-details">
                        <h3>{item.title}</h3>
                        <p>{item.price}</p>
                        <p className="item-type">{item.type}</p>
                      </div>
                      <div className="item-actions">
                        <IconButton
                          aria-label="more"
                          aria-controls={`item-menu-${index}`}
                          aria-haspopup="true"
                          onClick={(e) => handleClick(e, index)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id={`item-menu-${index}`}
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && menuIndex === index}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => handleMenuItemClick('Move To Top')}>
                            <ArrowUpward /> <ListItemText primary="Move To Top" />
                          </MenuItem>
                          <MenuItem onClick={() => handleMenuItemClick('Move To Bottom')}>
                            <ArrowDownward /> <ListItemText primary="Move To Bottom" />
                          </MenuItem>
                          <MenuItem onClick={() => handleMenuItemClick('Remove')}>
                            <Delete /> <ListItemText primary="Remove" />
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ManageBundle;
