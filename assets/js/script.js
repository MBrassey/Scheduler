var setDate = function () {
    $("#today").text(moment().format("dddd, MMMM Do"));
};

var setWorkDuration = function () {
    workStart = 6;
};

setInterval(function () {
    setDate();
}, 1000 * 60 * 0.1);
