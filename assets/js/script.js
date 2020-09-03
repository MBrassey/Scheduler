var toggle = false; // 12 / 8 Hour Modes

var setDate = function () {
    $("#today").text(moment().format("dddd, MMMM Do"));
};

var setWorkDuration = function () {
    if (toggle) {
        workStart = 6;
        workEnd = 18;  
    } else {
    workStart = 9;
    workEnd = 18;
    }
};

// Listen For Toggle Button Clicked

$("#toggle").click(function(){
    if (toggle) {
        toggle = false;
        console.log(toggle);
        loadTasks();
    } else {
        toggle = true;
        console.log(toggle);
        loadTasks();
    }
  });

var loadTasks = function () {
    setDate();
    setWorkDuration();
    $('#schedule').empty();
    var container = document.getElementById("schedule");
    for (i = workStart; i < workEnd; i++) {
        var hour = i;
        if (i > 12) {
            hour = hour - 12 + "PM";
        } else if (i === 12) {
            hour = hour + "PM";
        } else {
            hour = hour + "AM";
        }
        var task = localStorage.getItem(i) ?? "";
        var html = `<div class="row mt-1">
        <div class="col-1 col-lg-1 time-block hour">
            ${hour}
        </div>
        <div class="col-10 col-lg-10" id="s${i}">
          <p id="day${i}" class="description">${task}</p>
        </div>
        <button id="saveBtn${i}" class="col-1 col-lg-1 saveBtn"><span class="fas fa-save"></span></button> 
            
      </div>`;
        container.insertAdjacentHTML("beforeend", html);
    }
    updateTime();

    $("[id^=saveBtn]").on("click", function () {
        var id = this.id,
            time = id.replace(/\D/g, "");
        var description = $("#day" + time).html();
        saveTask(time, description);
    });
};

function saveTask(time, description) {
    localStorage.setItem(time, description);
}

$("div").on("click", "p", function () {
    var text = $(this).text();
    var textInput = $("<textarea>");
    $(this).replaceWith(textInput);
    textInput.trigger("focus").attr("id", this.id).addClass("form-control description").val(text).text().trim();
});

$("div").on("blur", "textarea", function () {
    var text = $(this).val().trim();
    var taskP = $("<p>").attr("id", this.id).addClass("description").text(text);
    $(this).replaceWith(taskP);
});

function updateTime() {
    var currentHour = moment().hour();
    $(".mt-1").each(function () {
        var timeBlock = $(this).children(".time-block").text();
        var matches = timeBlock.match(/\d+/g);
        var hourNum = parseInt(matches);
        if (hourNum < workStart) {
            var twentyFour = hourNum + 12;
        } else {
            var twentyFour = hourNum;
        }
        if (currentHour < twentyFour) {
            $(this).addClass("future");
            $(this).removeClass("present");
            $(this).removeClass("past");
        } else if (currentHour === twentyFour) {
            $(this).addClass("present");
            $(this).removeClass("past");
            $(this).removeClass("future");
        } else if (currentHour > twentyFour) {
            $(this).addClass("past");
            $(this).removeClass("present");
            $(this).removeClass("future");
        }
    });
}

loadTasks();

// Iterate Every Minute
setInterval(function () {
    setDate();
    updateTime();
}, 1000 * 60 * 1); // 60 Seconds
