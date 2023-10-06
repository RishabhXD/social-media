import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/:friendID", verifyToken, addRemoveFriends);

export const userRoutes = router;
