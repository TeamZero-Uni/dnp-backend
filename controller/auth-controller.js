const token = require("../utils/jwt");
const { sendMail } = require("../utils/mailer");
const { sequelize, User, Customer } = require("../models");
const bcrypt = require("bcryptjs");
const verifyEmail = require("../template/verifyEmail");
const { where } = require("sequelize");
const ApiResponse = require("../utils/apiResponse");

const login = async (req, res) => {
  res.json({ status: "API is running" });
};

const register = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      await transaction.rollback();
      return ApiResponse.badRequest(res, "All fields are required");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await transaction.rollback();
      return ApiResponse.conflict(res, "Email already registered");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await User.create(
      {
        email: email,
        password: await bcrypt.hash(password, 10),
        otp,
        otpExpiry: expiry,
        role: "CUSTOMER",
        customer: { cus_name: name },
      },
      { include: [{ model: Customer, as: "customer" }], transaction },
    );
    await transaction.commit();

    sendMail({
      to: email,
      subject: "Verify your email",
      html: verifyEmail(otp),
    });

    return ApiResponse.created(res, "OTP sent to your email. Verify to continue");
  } catch (error) {
    await transaction.rollback();
    return ApiResponse.error(res, error.message);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp) return ApiResponse.badRequest(res, "OTP required");

    const user = await User.findOne({ where: { email } });

    if (!user) return ApiResponse.notFound(res, "User not found");

    if (user.isVerified)
      return ApiResponse.badRequest(res, "User already verified");

    if (user.otp !== otp) return ApiResponse.badRequest(res, "Invalid OTP");

    if (new Date() > user.otpExpiry)
      return ApiResponse.badRequest(res, "OTP expired");

    user.otp = null;
    user.otpExpiry = null;
    user.isVerified = true;
    await user.save();

    return ApiResponse.success(res, "Email verified successfully");
  } catch (err) {
    return ApiResponse.error(res, err.message);
  }
};

const generatOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return ApiResponse.badRequest(res, "Email is required");

    const user = await User.findOne({ where: { email } });

    if (!user) return ApiResponse.notFound(res, "User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    await sendMail({
      to: email,
      subject: "Your new OTP",
      html: verifyEmail(otp),
    });

    return ApiResponse.success(res, "New OTP sent to your email");
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const logout = async (req, res) => {
  res.json({ status: "API is running" });
};

const getMe = async (req, res) => {
  res.json({ status: "API is running" });
};

const refreshToken = async (req, res) => {
  res.json({ status: "API is running" });
};

module.exports = {
  login,
  register,
  logout,
  getMe,
  refreshToken,
  verifyOTP,
  generatOtp,
};
