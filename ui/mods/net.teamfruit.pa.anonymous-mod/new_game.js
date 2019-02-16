(function () {
    model.armies.subscribe(function (changes) {
        _.forEach(changes, function (change) {
            if (change.status === 'added') {
                function controlColor(slot)
                {
                    var primaryColorValue = slot.primaryColor;
                    slot.primaryColor = ko.pureComputed({
                        read: function () {
                            if (slot.allowColorModification())
                                return primaryColorValue();
                            else
                                return "rgb(255,255,255)";
                        },
                        write: primaryColorValue
                    });
                    var secondaryColorValue = slot.secondaryColor;
                    slot.secondaryColor = ko.pureComputed({
                        read: function () {
                            if (slot.allowColorModification())
                                return secondaryColorValue();
                            else
                                return "rgb(255,255,255)";
                        },
                        write: secondaryColorValue
                    });
                }
                _.forEach(change.value.slots(), controlColor);
                change.value.slots.subscribe(function (changes1) {
                    _.forEach(changes1, function (change1) {
                        if (change1.status === 'added') {
                            controlColor(change1.value);
                        }
                    });
                }, null, "arrayChange");
            }
        });
    }, null, "arrayChange");
})();