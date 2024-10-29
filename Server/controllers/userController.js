import Verification from "../models/emailVerification.js";
import Followers from "../models/followersModel.js";
import Users from "../models/userModel.js";
import { compareString, createJWT } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const OPTVerification = async (req, res, next) => {
  try {
    const { userId, otp } = req.params;

    const result = await Verification.findOne({ userId });

    const { expiresAt, token } = result;

    // token has expired, delete token
    if (expiresAt < Date.now()) {
      await Verification.findOneAndDelete({ userId });

      const message = "Verification token has expired.";
      res.status(404).json({ message });
    } else {
      const isMatch = await compareString(otp, token);

      if (isMatch) {
        await Promise.all([
          Users.findOneAndUpdate({ _id: userId }, { emailVerified: true }),
          Verification.findOneAndDelete({ userId }),
        ]);

        const message = "Email verified successfully";
        res.status(200).json({ message });
      } else {
        const message = "Verification failed or link is invalid";
        res.status(404).json({ message });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const resendOTP = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Verification.findOneAndDelete({ userId: id });

    const user = await Users.findById(id);

    user.password = undefined;

    const token = createJWT(user?._id);

    if (user?.accountType === "Writer") {
      sendVerificationEmail(user, res, token);
    } else res.status(404).json({ message: "Something went wrong" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

// export const followWritter = async (req, res, next) => {
//   try {
//     const followerId = req.body.user.userId;
//     const { id } = req.params;

//     const checks = await Followers.findOne({ followerId });

//     if (checks)
//       return res.status(201).json({
//         success: false,
//         message: "You're already following this writer.",
//       });

//     const writer = await Users.findById(id);

//     const newFollower = await Followers.create({
//       followerId,
//       writerId: id,
//     });

//     writer?.followers?.push(newFollower?._id);

//     await Users.findByIdAndUpdate(id, writer, { new: true });

//     res.status(201).json({
//       success: true,
//       message: "You're now following writer " + writer?.name,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };
export const followWritter = async (req, res, next) => {
  try {
    const followerId = req.body.user.userId; // Follower's user ID
    const { id: writerId } = req.params; // Writer's ID from the request params

    // Check if the user is already following this specific writer
    const checks = await Followers.findOne({ followerId, writerId });

    if (checks) {
      return res.status(201).json({
        success: false,
        message: "You're already following this writer.",
      });
    }

    // Find the writer in the Users collection
    const writer = await Users.findById(writerId);

    if (!writer) {
      return res.status(404).json({
        success: false,
        message: "Writer not found.",
      });
    }

    // Create a new follower record
    const newFollower = await Followers.create({
      followerId,
      writerId,
    });

    // Add the new follower's ID to the writer's followers list
    writer.followers.push(newFollower._id);

    // Update the writer in the Users collection with the new followers list
    await Users.findByIdAndUpdate(writerId, writer, { new: true });

    res.status(201).json({
      success: true,
      message: "You're now following writer " + writer?.name,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { firstName, lastName, image } = req.body;

    if (!(firstName || lastName)) {
      return next("Please provide all required fields");
    }

    const updateUser = {
      name: firstName + " " + lastName,
      image,
      _id: userId,
    };

    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    const token = createJWT(user?._id);

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getWriter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id).populate({
      path: "followers",
      select: "followerId",
    });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Writer Not Found",
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};