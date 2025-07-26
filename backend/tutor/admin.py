from django.contrib import admin
from .models import Classroom, Student, Session, FileUpload, Assignment, AssignmentSubmission, Booking
# Register your models here.
admin.site.register(Classroom)
admin.site.register(Student)
admin.site.register(Session)
admin.site.register(FileUpload)
admin.site.register(Assignment)
admin.site.register(AssignmentSubmission)
admin.site.register(Booking)
