const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

//login user
const loginUser = async (req, res) => {

    const {email,password} = req.body


    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({ user, token });

    } catch (error) {
         res.status(400).json({ error: error.message });
    }
 
};

//signup user
const signupUser = async (req, res) => {
  const { firstname,lastname,mobilenumber,type,email,password,confirmpassword } = req.body;

  try {
    const user = await User.signup(firstname,lastname,mobilenumber,type,email,password,confirmpassword);
    //create token
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
