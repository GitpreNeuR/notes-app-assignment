import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Loader } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { setNotes, addNote, removeNote } from '../store/slices/notesSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    fetchNotes();
    console.log(user)
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        toast.error('Access Token not found, Please SignUp');
        return navigate('/');
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/getAllNotes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching notes');
      }
      const data = await response.json();
      dispatch(setNotes(data.notes));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please provide content');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Error creating note');
      }
      const data = await response.json();
      dispatch(addNote(data.note));
      setContent('');
      toast.success('Note created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/deleteNote/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error deleting note');
      }
      dispatch(removeNote(id));
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome, {user?.name}!
              </h1>
              <p className="text-gray-600">
                Manage your notes here
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          {/* Create Note Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <form onSubmit={handleCreateNote} className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Create New Note
              </h2>
              <div className="flex gap-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  {loading ? (
                    <Loader className="animate-spin" size={18} />
                  ) : (
                    <>
                      <Plus size={18} />
                      Add Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Notes List Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Your Notes
              </h2>
              <span className="text-sm text-gray-500">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </span>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader className="animate-spin text-blue-600" size={24} />
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div 
                    key={note._id} 
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="flex-1 text-gray-800 whitespace-pre-wrap">
                        {note.content}
                      </p>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        disabled={loading}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                
                {notes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No notes yet. Create one above!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
