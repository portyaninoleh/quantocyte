from django.conf.urls import patterns, include, url

from quantoApp.views import LoginView, ListView, LogoutView

# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', LoginView.as_view(),
        name='login'),
    url(r'^list/$', ListView.as_view(),
        name='list'),
    url(r'^logout/$', LogoutView.as_view(),
        name='logout'),
)