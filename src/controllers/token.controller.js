import asyncHandller from "../utils/asyncHandller.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const Token = asyncHandller(async (req, res) => {
  const { token } = req.body;
  if (!token) {
		throw new ApiError(401, "Something went wrong ")
	}
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
			throw new ApiError(403, "Something went wrong")
		}
    const newAccessToken = user.generateAccessToken();
    res.json({ accessToken: newAccessToken });
  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
	}
});

export { Token };
