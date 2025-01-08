const bcrypt = require('bcrypt');
const User = require('../models/User');
const Otp = require('../models/Otp');
const generateToken = require('../utils/generate-token');
const sendEmail = require('../utils/mailer');

exports.register = async (req, res) => {
  const { dateOfBirth, email, name } = req.body;
  try {
    if (!dateOfBirth || !email || !name) {
      throw new Error('All fields are required');
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }

    const newUser = new User({ email, dateOfBirth, name });
    await newUser.save();

    const token = await generateToken(newUser._id);
    res.status(200).json({ message: 'User created successfully', user: newUser, token });
  } catch (error) {
    console.error('SignUp Error:', error.message);
    res.status(500).json({ message: error.message, error: 'SignUp Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error('Please provide an email');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }

    const token = await generateToken(user._id);
    res.status(200).json({ message: 'User signed in successfully', user, token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'Login Error', message: error.message });
  }
};

exports.sendOtpVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email' });
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedOtp = await bcrypt.hash(otp, 10);

    const newOtp = new Otp({
      email,
      otp: hashedOtp,
      expiresAt: Date.now() + 120000,
    });
    await newOtp.save();

    const html = `<p>Enter <b>${otp}</b> in the app to verify your email address.</p><p>This code expires in 2 minutes.</p>`;
    await sendEmail(email, 'Verify Your Email', html);

    res.status(200).json({ message: 'Verification OTP email sent', data: { email } });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otp || !email) {
      throw new Error('Empty OTP or email not allowed');
    }

    const otpRecords = await Otp.find({ email });
    if (otpRecords.length <= 0) {
      throw new Error('Account records do not exist or user has been verified already');
    }

    const { expiresAt, otp: hashedOtp } = otpRecords[0];
    if (expiresAt < Date.now()) {
      await Otp.deleteMany({ email });
      throw new Error('OTP has expired, please request again');
    }

    const isValidOtp = await bcrypt.compare(otp, hashedOtp);
    if (!isValidOtp) {
      throw new Error('Invalid OTP');
    }

    await Otp.deleteMany({ email });
    res.status(200).json({ status: 'VERIFIED', message: 'User email has been verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ message: error.message });
  }
};