# Django -- Section 6: Your First Django Application -- Notes
## Objectives
* views.py
* urls.py


## **Theory**

![image](images/mvt.jpg)


### pipenv
```bash
pipenv shell
```

### Installation
```bash
pipenv install django
django-admin startproject main .
```

### Run server
```bash
python manage.py migrate
python manage.py runserver
#runserver on the localhost:8000
```



## Creating App 
```bash
python manage.py startapp app_name #app_name = pages for this code
```

> Once you have created your app, you must tell Django to install it into your project. This is easy to do—inside your settings.py file is a list
named INSTALLED_APPS.

``` python 
#setting.py

INSTALLED_APPS = [
    'pages.apps.PagesConfig',
    ...
]
```
<br>

> **Inside every app, Django creates a file, apps.py**, containing a configuration class named after your app.Here, the class is named PagesConfig.

```python
#pages/apps.py
from django.apps import AppConfig

class PagesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pages'

```

### Django App structure 
```
\pages
    \migrations
        __init__.py
    admin.py
    apps.py
    models.py
    tests.py
    views.py
```

## First views

```python
#pages\views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("<h1>Hello world!</h1>")

```

### Configure the URLs
> In the Django, the *path()* function is used to configure URLs. => path(route, view) {e.g: path('mypage/',views.myview) }

>The path() function statements are kept in a **special file called urls.py**.


#### Tutorial by main urls.py file

```python
"""
Function views : pages/urls.py : 
    1. Add an import:  from . import views
    2. Add a URL to urlpatterns:  path('', views.home, name='index')
Class-based views pages/urls.py :
    1. Add an import:  from django.urls import include, path
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf main/urls.py :
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
```
<h3 style='color:red'><bold> Note: name='index' because view.py function name is index</bold> </h3>


# Django -- Section 7: Creating the Page Model -- Notes

## Objectives
* model.py file
* admin page
  
## The Page Model

```python
#pages/models.py
class Page(models.Model):
    title = models.CharField(max_length=60)
    permalink = models.CharField(max_length=12,unique=True)
    update_date = models.DateTimeField('Last Updated')
    bodytext = models.TextField('Page Content',blank=True)
```

> There is one more thing we have to do with our model—**a model must be
registered with the admin to be accessible from the admin.**

```python
# pages/admin.py
from django.contrib import admin
from .models import Page

admin.site.register(Page)
```


<h3>For import something (urls or models) you should import  that: </h3>

```python
from .models|.views import model_name|view_name
```

# Creating admin
```bash
python migrate.py createsuperuser 
```

![](/images/admin_page.png)


## __str__ method
> The "\__str__" method is a special method that returns a human-
readable version of the Pages class whenever Python asks for a string
representation of the Pages object (which is what the admin is doing).If
there is no \__str__ method, Python returns the object type—hence “Page
object”.
```python 
#pages/models.py
from django.db import models
class Page(models.Model):
    title = models.CharField(max_length=60)
    permalink = models.CharField(max_length=12,unique=True)
    update_date = models.DateTimeField('Last Updated')
    bodytext = models.TextField('Page Content',blank=True)

    def __str__(self):
        return self.title
```

# Django -- Section 8: DJango Templates -- Notes
## Objectives
* templates
  
## Template Settings
> For Django to show your site template, it first must know where to look
for the template files. This is achieved by the TEMPLATES setting in
settings.py

```python
#settings.py 
TEMPLATES = [
    {
        ...
        'DIRS': [os.path.join(BASE_DIR, '[pages]/templates')],
        'APP_DIRS': True,
        ...
    },
]
```

### Static FIles - CSS, images and JavaScript
> Django can find the static files for our site. Add
the following below the STATIC_URL setting:

```python
#settings.py 

STATIC_URL = 'static/'

STATICFILES_DIRS = [
os.path.join(BASE_DIR, 'pages/static'),
]
```

### HTML and CSS connection 
```html
#pages/templates/home.html

{% load static %} # there is important for load static data
<link href="{% static 'index.css' %}"> # connection css to html

<h1>Hello world</h1>
```

## Parent and child templates

> Implementing inheritance is easy in Django—you define replaceable
blocks in each template so child templates can replace sections of the
parent template with content unique to the child.

### Parent template

```html
#pages/templates/base.html

<section id="main">
{% block content %}

<h1>Welcome!</h1>
<p>This is the site template</p>

{% endblock content %}
</section>
# ...

```

> You can
name your block tags anything you like—in our example, we are naming
the block tag “content”.

### Child template

```html
# pages\templates\index.html

{% extends "base.html" %} # connection to base.html

{ % block content %} # contents should bin in the block content
<h1>Welcome!</h1>
<p>This is the page template</p>
{ % endblock content %}
```
<p style ='color:red'> " { "NO space" % "- without space there will be error message that : Invalid block tag on line 8: 'endblock'. Did you forget to register or load this tag? </p> 


# Django - Section 9 : Improving Your View and Adding Navigation - Notes
## Objectives
* navigate to different pages
* To achieve this outcome, we have four tasks to complete:
  1. Modify our URLs to capture a page link;
  2. Rewrite our index view to select the correct page and return the content to the template;
  1. Modify our templates to show the new content;
  2. Turn the placeholder menu list in the left sidebar into a navigation
menu.


## Modify Page URLs
> The permalink field contains a text string our Django application will use to match our URL to the correct page.


```python
#pages/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.index, {'pagename': ''}, name='home'),
    path('<str:pagename>', views.index, name='index'),
]
```
<br>

# Django - Section :10 Creating a Contact Form
## Objectives :
* forms 