(function () {
    var stateValue = model.state;
    model.state = ko.pureComputed({
        read: function () {
            var state = stateValue();
            _.forEach(state.teams, function (team) {
                _.forEach(team.players, function (player) {
                    player.color = [[255,255,255], [255,255,255]];
                });
            });
            return state;
        },
        write: stateValue
    });
})();