import json

from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.generic.base import View
from django.utils.decorators import method_decorator

from models import Items


class LoginView(View):

    def get(self, request):
        return render(request, 'login.html', {})

    def post(self, request):
        username = request.POST.get('login', False)
        password = request.POST.get('password', False)
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponse(json.dumps({'page': reverse('list')}), mimetype='application/json')
        else:
            return HttpResponse(json.dumps({'error': True}), mimetype='application/json')


class ListView(View):

    @method_decorator(login_required)
    def get(self, request):
        if request.is_ajax():
            items = Items.objects.values('name')
            return HttpResponse(json.dumps(list(items)  ), mimetype='application/json')
        return render(request, 'list.html', {'list':Items.objects.all()})


class LogoutView(View):

    def get(self, request):
        logout(request)
        return HttpResponseRedirect(reverse('login'))

