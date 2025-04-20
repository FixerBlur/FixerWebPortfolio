from django.contrib import admin
from Base.models import Contact 
from .models import Project

# Register your models here.
admin.site.register(Contact)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'created_at')
    list_editable = ('order',)
    search_fields = ('title', 'description')
    list_filter = ('created_at',)
    ordering = ('order', '-created_at')