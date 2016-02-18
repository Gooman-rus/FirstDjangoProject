import json
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseBadRequest

from models import Job

def get_home(request):
    #return render(request, 'index.html')
    query_results = Job.objects.all()
    #return a response to your template and add query_results to the context
    context = {'query_results': query_results}
    return render(request, 'index.html', context)


class JobFormView(TemplateView):
    template_name = 'index.html'
    model = Job

    def get_context_data(self, **kwargs):
        context = super(JobFormView, self).get_context_data(**kwargs)
        context['query_results'] = Job.objects.all()
        return context


    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(JobFormView, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        if not request.is_ajax():
            return HttpResponseBadRequest('Error: Expected an XMLHttpRequest')
        HttpResponseBadRequest('Success!')
        #in_data = json.loads(request.body)
        #HttpResponseBadRequest(in_data)
        # job = Job()
        # job.name = form.cleaned_data['name']
        # job.category = form.cleaned_data['descriptions']
        # saved = True
        # job.save()
        #...

"""def get_jobs(request):
    query_results = Job.objects.all()
    #return a response to your template and add query_results to the context
    return render(request, 'index.html', query_results)"""

