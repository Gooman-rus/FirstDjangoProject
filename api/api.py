from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from jobs.models import Job


class JobResource(ModelResource):
     """
     API Facet
     """
     class Meta:
         queryset = Job.objects.all()
         resource_name = 'job'
         allowed_methods = ['post', 'get', 'patch', 'delete']
         authentication = Authentication()
         authorization = Authorization()
         alwayss_return_data = True