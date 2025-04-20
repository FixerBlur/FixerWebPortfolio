from django.db import models

# Create your models here.
class Contact(models.Model):
    name= models.CharField(max_length=40)
    email=models.EmailField(max_length=40)
    content=models.TextField(max_length=400)
    number=models.CharField(max_length=10)

    def __self__(self):
        return(self.name)

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Назва проекту")
    description = models.TextField(verbose_name="Опис проекту")
    image = models.URLField(verbose_name="URL зображення проекту")
    github_link = models.URLField(blank=True, null=True, verbose_name="Посилання на GitHub")
    live_link = models.URLField(blank=True, null=True, verbose_name="Посилання на живий проект")
    order = models.IntegerField(default=0, verbose_name="Порядок відображення")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.title