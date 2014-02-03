import json
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from django.views.generic.base import View


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
                HttpResponseRedirect(reverse('list'))
        else:
            HttpResponse(json.dumps({'error': True}), mimetype='application/json')