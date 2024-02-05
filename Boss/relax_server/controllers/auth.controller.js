import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import CreditCard from "../models/creditCards.model.js";
import Billing from "../models/billing.model.js";

const CLIENT_URL = "http://localhost:3000/";

export const register = async (req, res, next) => {

  console.log(" user received now:: ", req.body.role);
  try {
    const {
      username,
      firstName,
      nickName,
      lastName,
      phone,
      mobile,
      email,
      password,
      retypedPassword,
      role,
      status,
      educationDocs,
      legalDocs,
      profile,
      department,
      position,
      workMobile,
      telephone,
      branch,
      workLocation,
      joiningDate,
      contract,
      employeeType,
      workPermitNo,
      workPermitExpiry,
      visaNo,
      visaExpiry,
      emiratesIdNo,
      passportNo,
      passportExpiry,
      lineManager,
      nationality,
      gender,
      language,
      maritalStatus,
      dateOfBirth,
      placeOfBirth,
      numOfChildren,
      homeAddress,
      academicLevel,
      fieldOfStudy,
      school,
      privateMobile,
      privateEmail,
      emergencyContactName,
      emergencyContactNumber,
      notes,
      country,
      state,
      city,
      address1,
      address2,
      zipCode,
      cardNumber,
      cardHolderName,
      expirationMonth,
      expirationYear,
      cvv,
      isCardSaved,
      isActive,
      isVerified,
      accountName,
      accountNumber,
      bankName,
      swiftNumber,
      ibanNumber,
      ibanNumberConfirm,
      countryBank,
    

    } = req.body;

 

      console.log("role role:: ",role);
     
 
    // Check if required fields are not empty
    const requiredFields = [
      'username',
      'firstName',
      'lastName',
      'email',
      'password',
      'retypedPassword',
      'role',
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required.` });
      }
    }

    // Check if password meets criteria
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least 3 characters, including at least one letter, one number, and one special character (@$!%*#?&)." });
    }
  
  
    // Check if password and retypedPassword match
    if (password !== retypedPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }



    // Check if username or email already exists
    const userWithSameUsername = await User.findOne({ username });
    if (userWithSameUsername) {
      return res.status(409).json({ message: 'Username already taken.' });
    }

    const userWithSameEmail = await User.findOne({ email });
    if (userWithSameEmail) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    // Check the user role
    const validRoles = ['isAdmin', 'isClient', 'isAgent'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    // Generate random ID
    const generateRandomID = (code) => {
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      return `${code}${randomNumber}`;
    };

    const IDCode = generateRandomID(role === 'isClient' ? 'C' : role === 'isAgent' ? 'H' : 'A');

    // Check if ID is exist
    const isIDExist = await User.findOne({ ID: IDCode });
    if (isIDExist) {
      return res.status(404).json({ message: "Something went wrong while generating ID" });
    }

 

     

          // only for admin 

    if(role ==='isAdmin'){

          // Check if passport number already exists
    const userWithSamePassport = await User.findOne({passportNo:passportNo });
    if (userWithSamePassport) {
      return res.status(404).json({ message: "Passport Number is registered by someone else." });
    }

      // check if IBAN is matching with 
      if(ibanNumber !== ibanNumberConfirm){
        return res.status(404).json({message:"IBANs do not match! please try again to confirm it!"});
      }
      
       // Validate expiration month (1-12)
       if (expirationMonth < 1 || expirationMonth > 12) {
        return res.status(400).json({ message: "Expiration month must be between 1 and 12",  });
      }
  
      // Validate expiration year (current year or later)
      if (expirationYear < new Date().getFullYear()) {
        return res.status(400).json({ message: "Expiration year must not be in the past" });
      }

          }


          let GENDER = gender;
          if(role !== 'isAdmin'){
            GENDER = 'none';
          }


    // Create a new user
    const hash = bcrypt.hashSync(password, 10); // Increase the salt rounds for better security

    let newUser;
if(role !=='isAdmin'){
  newUser = new User({
    username,
    firstName,
    lastName,
    email,
    role,
    profile,
    country,
    state,
    city,
    address1,
    address2,
    zipCode,
 
    password: hash,
 
    status,

    passportNo:IDCode,
 
    ID: IDCode,
    isActive,
    isVerified,
    
  });

  if(!newUser) {
    return res.status(404).json({ message: "failed to create a new User!" });
  
  }
}
 

      if(role === 'isAdmin'){

        newUser = new User({
          username,
          firstName,
          nickName,
          lastName,
          phone,
          mobile,
          profile,
          country,
          state,
          city,
          address1,
          address2,
          zipCode,
          email,
          password: hash,
          role,
          status,
          documentIDs:legalDocs,
          documentIDsE:educationDocs,
          department,
          position,
          workMobile,
          telephone,
        
          branch,
          workLocation,
          joiningDate,
          contract,
          employeeType,
          workPermitNo,
          workPermitExpiry,
          visaNo,
          visaExpiry,
          emiratesIdNo,
          passportNo,
          passportExpiry,
          lineManager: '6577474bc344e02d8702966b',
          nationality,
          gender:GENDER,
          language,
          maritalStatus,
          dateOfBirth,
          placeOfBirth,
          numOfChildren,
          homeAddress,
          academicLevel,
          fieldOfStudy,
          school,
          privateMobile,
          privateEmail,
          emergencyContactName,
          emergencyContactNumber,
          notes,
          countryBank,
          ID: IDCode,
          isActive,
          isVerified,
          
        });
    
        if(!newUser) {
          return res.status(404).json({ message: "failed to create a new User!" });
        
        }
 // Create a new credit card
 const createBankCard = new CreditCard({
  userId: newUser._id,
  cardNumber,
  cardHolderName,
  expirationMonth,
  expirationYear,
  cvv,
});


     // Create a new bank information
     const createBankInfo = new Billing({
      userId: newUser._id,
      accountName,
      accountNumber,
      bankName,
      swiftNumber,
      ibanNumber,
    });


  if (isCardSaved) {
    newUser.isCardSaved = createBankCard._id;
    await newUser.save();
  }

  // Save the credit card and bank information
  await createBankCard.save();
  await createBankInfo.save();

  newUser.creditCard.push(createBankCard._id);
  newUser.bankInfo.push(createBankInfo._id);


      }
     
  // end for admin 
 
    await newUser.save();

    res.status(201).json({ newUser });
    console.log("saved to db succesfully");
  } catch (err) {
    console.error("ikibazo:: ",err);
    res.status(500).json({ message: "shida wanna" });
   
  }
};



















export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "Invalid credentials1"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Invalid credentials2"));
      // res.json(err)
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;


    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",

    })
      .status(200)
      .send(info);
    // res.redirect("https://relaxationstays.com/");



  } catch (err) {
    // Log the error and return a generic error message to the client
    console.error(err);
    return next(createError(500, "An unexpected error occurred"));
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "Invalid credentials1"));
    }

    // check if the authenicated user is realy admin 

    // if(user.role !== 'isAdmin') return next(createError,(404,"An Authorized Access!!"))

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Invalid credentials2"));
      // res.json(err)
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;


    res.cookie("accessToken", token, {
      httpOnly: true,
      // secure: true,
      // sameSite: "none",

    })
      .status(200)
      .send(info);
    // res.redirect("https://relaxationstays.com/");



  } catch (err) {
    // Log the error and return a generic error message to the client
    console.error(err);
    return next(createError(500, "An unexpected error occurred"));
  }
};

 

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");

    // res.redirect(CLIENT_URL);

  // console.log("request received!!!!!!!");
    
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, newRepassword } = req.body;
  const userId = req.userId;
  try {
    // Find the user by the authenticated userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user aold passwrd::", user.password);
    const isCorrect = bcrypt.compareSync(oldPassword, user.password);
    if (!isCorrect) {
      // return next(createError(400, "Incorrect old password"));
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Validate the new password and new repassword
    if (newPassword !== newRepassword) {
      return res.status(400).json({ message: "New password and new repassword do not match" });
    }

    // Check if password meets criteria
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "Password must contain at least 6 characters, including at least one letter, one number, and one special character (@$!%*#?&)." });
    }

    const hash = bcrypt.hashSync(newPassword, 5);
    // Update the password
    user.password = hash;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

 




passport.use(new GoogleStrategy({
  clientID: "96641795331-u9dvrirjhc9bmhtm4g8rd43f9a2plj05.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:1337/api/auth/google/callback",
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    const { id, emails, name, photos } = profile;
    const googleId = id;
    const email = emails[0].value;
    const fullName = name.givenName;
    const lastName = name.familyName;
    const profilePic = photos[0].value;

    let user = await User.findOne({ "socialMedia.google.id": googleId });

    if (!user) {
      user = new User({
        fullName,
        lastName,
        role: 'isClient',
        email,
        authMethod: 'google',
        "socialMedia.google.id": googleId,
        "socialMedia.google.email": email,
        "socialMedia.google.name": fullName,
        "socialMedia.google.profilePic": profilePic
      });
      await user.save();
    } else {
      console.log("Email:", user.email);
      console.log("First Name:", user.fullName);
      console.log("Last Name:", user.lastName);
      console.log("Profile Picture:", user.socialMedia.google.profilePic);
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

export const googleAuth = passport.authenticate('google', { scope: ['email', 'profile'] });


export const googleAuthCallback = (req, res) => {
  passport.authenticate('google', async (err, user) => {
    if (err) {
      console.log("this is an error maniga::: ",err);
      return res.status(500).json({ message: 'Failed to authenticate with Google' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Google authentication failed' });
    }

    try {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

      res.cookie('accessToken', token, {
        httpOnly: true,
        // secure: true,
        // sameSite: 'none',
      })
      .status(200);
      // .json(user);

      // res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to generate token' });
    }
  })(req, res);
};


export const success = (req, res) => {
  res.send("Google authentication successful!");
};

export const failure = (req, res) => {
  res.send("Google authentication failed!");
};
// const CLIENT_URL = "http://localhost:3000/";
export const googleLogout =  (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
};


export const google_logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");

    // res.redirect(CLIENT_URL);
    
};
// no problem am still here maninga 