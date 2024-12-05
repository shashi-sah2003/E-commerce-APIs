import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:emailId", async (req, res) => {
  try {
    const user = await User.findOne({where: {email: req.params.emailId}});
    if (user) {
      await user.update(req.body);
      console.log(user)
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({where: {email: req.params.email}});
    if (user) {
      //console.log(user);
      res.status(200).json(user.dataValues);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
