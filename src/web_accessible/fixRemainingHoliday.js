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
    if(window.common) {
        const employeeId = window.common.employeeId;
        const homeWrapper = $(`a[href='/employees/pto/?id=${employeeId}']`).first();
        const homeElements = homeWrapper.find("h2 span");
        if(homeElements.length > 0) {
            const homeTimeOffElement = homeElements.last();

            bambooFixesDownloadRemainingHoliday(window.common.employeeId, function(values) {
                const holidayHtml = `${values.total}`;

                homeTimeOffElement.html(holidayHtml);
                homeTimeOffElement.addClass('FixedTime');
            });
        }
    }

    setTimeout(() => {
        const myInfoElements = $("div[aria-labelledby='policy-card-title-1'] h3");
        if(myInfoElements.length > 0) {
            const myInfoTimeOffElement = myInfoElements.first();

            const url_string = window.location.href
            const url = new URL(url_string);
            const employeeId = url.searchParams.get("id");

            bambooFixesDownloadRemainingHoliday(employeeId, function(values) {
                const holidayHtml = `${values.total}&nbsp;Days`

                myInfoTimeOffElement.html(holidayHtml);
                myInfoTimeOffElement.addClass('FixedTime');
            });
        }
    }, 2000);

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
