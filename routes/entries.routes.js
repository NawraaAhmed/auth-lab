const router = require("express").Router();
const Entry = require("../models/Entry");
const isSignedIn = require("../middleware/is-signed-in.js");

//CRUD

//CREATE
router.get("/new", isSignedIn, (req, res) => {
  res.render("entries/new.ejs");
});

router.post("/", isSignedIn, async (req, res) => {
  //console.log(req.session.user);
  req.body.isPublic = req.body.isPublic === "on";

  const createdEntry = await Entry.create({
    title: req.body.title,
    entryBody: req.body.entryBody,
    isPublic: req.body.isPublic,
    owner: req.session.user._id,
  });
  res.redirect("/entries/my-entries");
});

//READ
router.get("/", async (req, res) => {
  const publicEntries = await Entry.find({ isPublic: true });
  res.render("entries/all-entries.ejs", { entries: publicEntries });
});

router.get("/my-entries", isSignedIn, async (req, res) => {
  const myEntries = await Entry.find({ owner: req.session.user._id });
  res.render("entries/my-entries.ejs", { entries: myEntries });
});

//UPDATE
router.get("/:entryId/edit", isSignedIn, async (req, res) => {
  const foundEntry = await Entry.findById(req.params.entryId);
  res.render("entries/edit-entry.ejs", { entry: foundEntry });
});

router.put("/:entryId", isSignedIn, async (req, res) => {
  req.body.isPublic = req.body.isPublic === "on";

  const updatedEntry = await Entry.findByIdAndUpdate(
    req.params.entryId,
    req.body,
  );
  res.redirect("/entries/my-entries");
});

//DELETE
router.delete("/:entryId", isSignedIn, async (req, res) => {
  const deletedEntry = await Entry.findByIdAndDelete(req.params.entryId);
  res.redirect("/entries/my-entries");
});

module.exports = router;
