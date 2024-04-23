document.querySelector('.menu-icon').addEventListener('click', function () {
    document.getElementById('menu-toggle').click();
});

$(document).ready(function () {
    $('#scoreForm').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        $.ajax({
            type: 'POST',
            url: '/server.js',
            data: $(this).serialize(), // Serialize form data
            success: function (response) {
                // Updates the page content with the response from the server
                // Updates the score or any other content here
            },
            error: function (xhr, status, error) {
                // Handle errors
            }
        });
    });
});