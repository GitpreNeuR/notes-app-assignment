import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import AuthLayout from '../layouts/AuthLayout';
import { Eye, EyeOff } from 'lucide-react'; 
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [generatingOtp, setGeneratingOtp] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGenerateOtp = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    if (!email) {
      toast.error('Please provide email');
      return;
    }
  
    try {
      setGeneratingOtp(true); // Start loading
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sendOtpVerificationEmail`,
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
    } finally {
      setGeneratingOtp(false); // Stop loading
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (!email || !otp) {
      toast.error('Please provide email and OTP');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verifyOtp`, {
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
  };

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (!verified) {
      toast.error('Please verify your email first');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      dispatch(setCredentials({ user: data.user, token: data.token }));
      toast.success('Signed in successfully');
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
        <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showOtp ? 'text' : 'password'}
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
              onClick={(e) => handleVerifyOtp(e)}
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
            onClick={(e) => handleSignIn(e)}
            disabled={loading || !verified}
            className={`w-full py-2 rounded-md text-white ${
              loading || !verified
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition duration-300'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-center mt-4">
            Need an account?{' '}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;