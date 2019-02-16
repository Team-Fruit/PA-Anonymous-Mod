(function () {
    var list = ["Alligator", "Anteater", "Armadillo", "Auroch", "Axolotl", "Badger", "Bat", "Bear", "Beaver", "Buffalo", "Camel", "Capybara", "Chameleon", "Cheetah", "Chinchilla", "Chipmunk", "Chupacabra", "Cormorant", "Coyote", "Crow", "Dingo", "Dinosaur", "Dog", "Dolphin", "Duck", "Elephant", "Ferret", "Fox", "Frog", "Giraffe", "Gopher", "Grizzly", "Hedgehog", "Hippo", "Hyena", "Ibex", "Ifrit", "Iguana", "Jackal", "Kangaroo", "Koala", "Kraken", "Lemur", "Leopard", "Liger", "Lion", "Llama", "Loris", "Manatee", "Mink", "Monkey", "Moose", "Narwhal", "Nyan Cat", "Orangutan", "Otter", "Panda", "Penguin", "Platypus", "Pumpkin", "Python", "Quagga", "Rabbit", "Raccoon", "Rhino", "Sheep", "Shrew", "Skunk", "Squirrel", "Tiger", "Turtle", "Walrus", "Wolf", "Wolverine", "Wombat"];
    function hash(y) {
        y = y ^ (y << 13);
        y = y ^ (y >> 17);
        y = y ^ (y << 15);
        return y;
    }

    var stateValue = model.state;
    model.state = ko.pureComputed({
        read: function () {
            var state = stateValue();
            _.forEach(state.players, function (player) {
                if (player.rawName === undefined)
                    player.rawName = player.name;
                var anonymousName = list[player.id % list.length];
                if (state.spectator || player.id === model.orginalArmyId())
                    player.name = player.rawName + " (Anonymous " + anonymousName + ")";
                else
                    player.name = "Anonymous " + anonymousName;
            });
            return state;
        },
        write: stateValue
    });

    var sortedPlayersArrayValue = model.sortedPlayersArray;
    model.sortedPlayersArray = ko.pureComputed({
        read: function () {
            var teams = sortedPlayersArrayValue();
            _.forEach(teams, function (players) {
                players.sort(function (a, b) {
                    return hash(b.id) - hash(a.id);
                });
            });
            teams.sort(function (a, b) {
                return hash(b[0].id) - hash(a[0].id);
            });
            return teams;
        },
        write: sortedPlayersArrayValue
    });
})();