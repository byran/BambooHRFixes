function bambooFixesDownloadRemainingHoliday(employeeId, success) {
    const current = new Date();
    const year = current.getFullYear();
    const data = {
        endDate: '31/12/' + year,
        timeOffType: '1',
        employeeId: employeeId
    };

    $.ajax({
        type: "GET",
        data: data,
        url: "/time_off/calculator/calculate",
        dataType: 'json',
        success: success
    });
}

$(document).ready(function() {
    const homeElements = $('.TimeOffWidget__type-available');
    if(homeElements.length > 0) {
        const homeTimeOffElement = homeElements.first();

        bambooFixesDownloadRemainingHoliday(window.common.employeeId, function(values) {
            const holidayHtml = '<div id="FixedTime">' + values.total + '</div>'

            homeTimeOffElement.html(holidayHtml);
        });
    }

    const myInfoElements = $('.TOCard__iconAndTime');
    if(myInfoElements.length > 0) {
        const myInfoTimeOffElement = myInfoElements.first();

        const url_string = window.location.href
        const url = new URL(url_string);
        const employeeId = url.searchParams.get("id");

        bambooFixesDownloadRemainingHoliday(employeeId, function(values) {
            const holidayHtml = '<div id="FixedTime">' + values.total + '</div>'

            myInfoTimeOffElement.html(holidayHtml);
        });
    }

    const slickTrack = $('.slick-track .slick-slide div');
    if(slickTrack.length > 0) {
        const myInfoTimeOffElementX = slickTrack.first();
        const newDiv = $("<div id=\"FixedTimeMyInfo\"></div>");

        myInfoTimeOffElementX.prepend(newDiv);

        const url_string = window.location.href
        const url = new URL(url_string);
        const employeeId = url.searchParams.get("id");

        bambooFixesDownloadRemainingHoliday(employeeId, function(values) {
            const holidayHtml = values.total;

            newDiv.html(holidayHtml);
        });
    }
});
