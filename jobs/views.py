import json

from django.core.serializers import serialize
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseBadRequest, HttpResponse
from tastypie import serializers

from models import Job

# def get_home(request):
#     #return render(request, 'index.html')
#     query_results = Job.objects.all()
#     #return a response to your template and add query_results to the context
#     context = {'query_results': query_results}
#     return render(request, 'index.html', context)


class JobFormView(TemplateView):
    template_name = 'index.html'
    model = Job

    # def get_context_data(self, **kwargs):
    #     context = super(JobFormView, self).get_context_data(**kwargs)
    #     context['query_results'] = Job.objects.all()
    #     return context


    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(JobFormView, self).dispatch(*args, **kwargs)

    # def post(self, request, *args, **kwargs):
    #     in_data = json.loads(request.body)
    #     HttpResponse('Success')
    #     job = Job()
    #     job.name = in_data['name']
    #     job.description = in_data['description']
    #     job.save()
    #     return render(request, 'index.html')

    # def get(self, request, *args, **kwargs):
    #     out_data = serialize('json', Job.objects.all())
    #     HttpResponse(out_data, content_type="application/json")
    #     return render(request, 'index.html')