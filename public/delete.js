function deleteExam(examId) {
    if (confirm("Are you sure you want to delete this exam?")) {
        $.ajax({
            url: '/exams/' + examId,
            method: 'DELETE',
            success: function() {
                // Success - Remove the exam row (or reload)
                $('#examRow-' + examId).remove(); // Assuming you add IDs to your rows
            },
            error: function(error) {
                // Handle error
                console.error('Error deleting exam:', error);
                alert('Could not delete exam');
            }
        });
    }
}
