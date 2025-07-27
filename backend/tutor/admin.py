from django.contrib import admin
from .models import (
    Classroom, Enrollment, Session, ClassroomFiles,
    Assignment, AssignmentSubmission
)

admin.site.register(Classroom)
admin.site.register(Enrollment)
admin.site.register(Session)
admin.site.register(ClassroomFiles)
admin.site.register(Assignment)
admin.site.register(AssignmentSubmission)
