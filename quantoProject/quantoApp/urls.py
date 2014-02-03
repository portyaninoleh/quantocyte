from django.conf.urls import patterns, include, url

from views import LoginView


urlpatterns = patterns('',
    url(r'^$', LoginView.as_view(),
        name='login')
)