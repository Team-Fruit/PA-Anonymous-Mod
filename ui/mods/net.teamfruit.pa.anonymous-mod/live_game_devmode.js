(function () {
    var list = ["Alligator", "Anteater", "Armadillo", "Auroch", "Axolotl", "Badger", "Bat", "Bear", "Beaver", "Buffalo", "Camel", "Capybara", "Chameleon", "Cheetah", "Chinchilla", "Chipmunk", "Chupacabra", "Cormorant", "Coyote", "Crow", "Dingo", "Dinosaur", "Dog", "Dolphin", "Duck", "Elephant", "Ferret", "Fox", "Frog", "Giraffe", "Gopher", "Grizzly", "Hedgehog", "Hippo", "Hyena", "Ibex", "Ifrit", "Iguana", "Jackal", "Kangaroo", "Koala", "Kraken", "Lemur", "Leopard", "Liger", "Lion", "Llama", "Loris", "Manatee", "Mink", "Monkey", "Moose", "Narwhal", "Nyan Cat", "Orangutan", "Otter", "Panda", "Penguin", "Platypus", "Pumpkin", "Python", "Quagga", "Rabbit", "Raccoon", "Rhino", "Sheep", "Shrew", "Skunk", "Squirrel", "Tiger", "Turtle", "Walrus", "Wolf", "Wolverine", "Wombat"];

    var stateValue = model.state;
    model.state = ko.pureComputed({
        read: function () {
            var state = stateValue();
            _.forEach(state.players, function (player) {
                if (player.rawName === undefined)
                    player.rawName = player.name;
                var anonymousName = list[player.id % list.length];
                if (state.spectator)
                    player.name = player.rawName + " (Anonymous " + anonymousName + ")";
                else
                    player.name = "Anonymous " + anonymousName;
            });
            return state;
        },
        write: stateValue
    });
})();