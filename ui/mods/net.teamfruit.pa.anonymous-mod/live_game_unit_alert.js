(function () {
    var list = ["Alligator", "Anteater", "Armadillo", "Auroch", "Axolotl", "Badger", "Bat", "Bear", "Beaver", "Buffalo", "Camel", "Capybara", "Chameleon", "Cheetah", "Chinchilla", "Chipmunk", "Chupacabra", "Cormorant", "Coyote", "Crow", "Dingo", "Dinosaur", "Dog", "Dolphin", "Duck", "Elephant", "Ferret", "Fox", "Frog", "Giraffe", "Gopher", "Grizzly", "Hedgehog", "Hippo", "Hyena", "Ibex", "Ifrit", "Iguana", "Jackal", "Kangaroo", "Koala", "Kraken", "Lemur", "Leopard", "Liger", "Lion", "Llama", "Loris", "Manatee", "Mink", "Monkey", "Moose", "Narwhal", "Nyan Cat", "Orangutan", "Otter", "Panda", "Penguin", "Platypus", "Pumpkin", "Python", "Quagga", "Rabbit", "Raccoon", "Rhino", "Sheep", "Shrew", "Skunk", "Squirrel", "Tiger", "Turtle", "Walrus", "Wolf", "Wolverine", "Wombat"];
    function hash(y) {
        y = y ^ (y << 13);
        y = y ^ (y >> 17);
        y = y ^ (y << 15);
        return y;
    }

    model.defeatedArmyAlerts.subscribe(function (changes) {
        _.forEach(changes, function (change) {
            if (change.status === 'added') {
                var defeated = change.value.defeated;
                var killer = change.value.killer;

                if (defeated.rawName === undefined)
                    defeated.rawName = defeated.name;
                var anonymousName = list[defeated.id % list.length];
                if (model.isSpectator())
                    defeated.name = defeated.rawName + " (Anonymous " + anonymousName + ")";
                else
                    defeated.name = "Anonymous " + anonymousName;
                
                if (killer) {
                    if (killer.rawName === undefined)
                        killer.rawName = killer.name;
                    var anonymousName = list[killer.id % list.length];
                    if (model.isSpectator())
                        killer.name = killer.rawName + " (Anonymous " + anonymousName + ")";
                    else
                        killer.name = "Anonymous " + anonymousName;
                }
            }
        });
    }, null, "arrayChange");
})();