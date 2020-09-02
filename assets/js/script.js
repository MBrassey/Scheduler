var setDate = function () {
    $("#today").text(moment().format("dddd, MMMM Do"));
};

var setWorkDuration = function () {
    workStart = 6;
};

var loadTasks = function () {
    setDate();
    setWorkDuration();
    var container = document.getElementById("schedule");
    for (i = workStart; i < 19; i++) {
        var hour = i;
        if (i > 12) {
            hour = hour - 12 + "PM";
        } else if (i === 12) {
            hour = hour + "PM";
        } else {
            hour = hour + "AM";
        }
        var task = "";
        var html = `<div class="row mt-1">
        <div class="col-1 time-block hour">
            ${hour}
        </div>
        <div class="col-10 col-lg-10" id="s${i}">
          <p id="day${i}" class="description">${task}</p>
        </div>
        <button id="saveBtn${i}" class="col-1 col-lg-1 saveBtn"><span class="fas fa-save"></span></button> 
            
      </div>`;
        container.insertAdjacentHTML("beforeend", html);
    }

    $("[id^=saveBtn]").on("click", function () {
    });
};

loadTasks();

setInterval(function () {
    setDate();
}, 1000 * 60 * 0.1);
