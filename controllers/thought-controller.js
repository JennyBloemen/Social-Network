const { Thought } = require("../model/Thought");
const User = require("../models/User");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtDate) => res.json(dbThoughtData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};

getThoughtbyId({params},res) {
    Thought.findOne({_id: params.thouhtId})
    .then((dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({message: "No thought found with this id."})
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err => res.json(err)); {

    })
        }
    }))
}