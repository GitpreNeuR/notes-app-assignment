import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Lock } from 'lucide-react';
import { setCredentials } from '../store/slices/api/authSlice';
import toast from 'react-hot-toast';
import AuthLayout from '../layouts/AuthLayout';
import { Eye, EyeOff } from 'lucide-react'; 

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatingOtp, setGeneratingOtp] = useState(false); 
  const [showOtp, setShowOtp] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyOtp = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    if (!email || !otp) {
      toast.error('Please provide email and OTP');
      return;
    }
  
    try {
      setGeneratingOtp(true); // Start loading

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verifyOtp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid OTP');
      }
  
      const data = await response.json();
      if (data.status === 'VERIFIED') {
        setVerified(true);
        toast.success('Email verified successfully');
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setGeneratingOtp(false); // Stop loading
    }
  };

  const handleGenerateOtp = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    if (!email) {
      toast.error('Please provide email');
      return;
    }
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/sendOtpVerificationEmail`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Error sending OTP');
      }
      toast.success('OTP sent successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    if (!verified) {
      toast.error('Please verify your email first');
      return;
    }
  
    if (!name || !email || !dateOfBirth) {
      toast.error('Please fill all fields');
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, dateOfBirth }),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const data = await response.json();
      dispatch(setCredentials({ user: data.user, token: data.token }));
      toast.success('Signed up successfully');
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
    <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold  mb-6">Sign Up</h1>
        <form className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
               <button
      type="button"
      onClick={() => setShowOtp(!showOtp)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      {showOtp ? <EyeOff size={20} /> : <Eye size={20} />} {/* Toggle icon */}
    </button>
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={verified}
              className={`px-4 py-2 rounded-md text-white ${
                verified ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {verified ? 'Verified' : 'Verify'}
            </button>
          </div>
          <button
  onClick={(e) => handleGenerateOtp(e)}
  disabled={generatingOtp}
  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
>
  {generatingOtp ? 'Generating...' : 'Generate OTP'} {/* Show loading text */}
</button>
          <button
            onClick={handleSignUp}
            disabled={loading || !verified}
            className={`w-full py-2 rounded-md text-white ${
              loading || !verified
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition duration-300'
            }`}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
    </div>
    </AuthLayout>
  );
};

export default SignUp;

