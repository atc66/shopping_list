const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/item");

// GET api/items
// DESC get all items
// Access public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// POST api/items
// DESC create an item
// Access public

router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// DELETE api/items/:id
// DESC Delete an item
// Access public

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
