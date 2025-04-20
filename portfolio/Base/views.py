from django.shortcuts import render ,redirect
from django.http import HttpResponse
from django.contrib import messages
from Base import models
from Base.models import Contact, Project 
# from django.contrib.auth.decorators import login_required
def home(request):
    # Отримуємо всі проекти
    projects = Project.objects.all()
    
    # Обробка форми контактів
    if request.method == "POST":
        name = request.POST['name']
        email = request.POST['email']
        content = request.POST['content']
        
        if len(name) < 2 or len(email) < 3 or len(content) < 4:
            messages.error(request, "Please fill the form correctly")
        else:
            contact = Contact(name=name, email=email, content=content)
            contact.save()
            messages.success(request, "Your message has been successfully sent")
    
    # Передаємо проекти в шаблон
    context = {
        'projects': projects
    }
    return render(request, 'index.html', context)


# @login_required(login_url='')
def contact(request):
   if request.method=="POST":
       print('post')
       name=request.POST.get('name')
       email=request.POST.get('email')
       number=request.POST.get('number')
       content=request.POST.get('content')
       print(name,email,number,content )

       if len(name)>1 and len(name)<30:
           pass
       else:
           messages.error(request,'Lenght of name should be greater than 2 and less than 30 words ')
           return render(request,'index.html')
       
       if len (email)>1 and len(email)<30:
           pass
       else:
           messages.error(request,'invaild email try again ')
           return render(request,'index.html')
       print(len(number))
       if  len(number)>9 and len(number)<13:
           pass
       else:
           messages.error(request,'invaild number please try again ')
           return render(request,'index.html')
       ins = models.Contact(name=name,email=email,content=content,number=number)
       ins.save()
       messages.success(request,'Thank You for contacting me!! Your message has been saved ')
       print('data has been saved to database')
 
       print('The request is no pass ')
   return render(request,'index.html') 


  
