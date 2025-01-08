import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeNote } from '../store/slices/notesSlice';

const Note = ({ content, id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notes/deleteNote/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error while deleting Note');
      }

      // Dispatch the removeNote action to update the Redux store
      dispatch(removeNote(id));
      console.log('Note deleted successfully');
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 rounded-md shadow-[0_0_10px_2px_rgba(0,0,0,0.2)]">
      <p className="">{content}</p>
      <div className="cursor-pointer">
        <div
          className="p-2 rounded-full hover:bg-red-200"
          onClick={handleDelete}
        >
          <Trash2 />
        </div>
      </div>
    </div>
  );
};

export default Note;