const router = require('express').Router();
let Thought = require('../models/thought');

router.route('/').get((req, res) => {
  Thought.find()
    .then(thoughts => res.json(thoughts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const thoughtText = req.body.thoughtText;
  const username = req.body.username;

  const newThought = new Thought({thoughtText, username});

  newThought.save()
    .then(() => res.json('Thought added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Thought.findById(req.params.id)
    .then(thought => res.json(thought))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Thought.findByIdAndDelete(req.params.id)
    .then(() => res.json('Thought deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Thought.findById(req.params.id)
    .then(thought => {
      thought.thoughtText = req.body.thoughtText;

      thought.save()
        .then(() => res.json('Thought updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
