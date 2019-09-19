from django.db import models,IntegrityError, transaction
from django.db.models import Sum
import json
import datetime
from django.http import HttpRequest,JsonResponse
from app.modules.main.main_models import *
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger,InvalidPage

def save_item(request):
    data = request.body.decode('utf8')
    data = json.loads(data)
    try:
        print(data['id'])
        if data['id']:
            #update
            Student.objects.filter(id=data['id']).update(first_name=data['firstName'],middle_name=data['middleName'],last_name=data['lastName'],birthdate=data['birthDate'],course=data['course'],year_level=data['yearLevel'])
        else:
            student=Student.objects.create(first_name=data['firstName'],middle_name=data['middleName'],last_name=data['lastName'],birthdate=data['birthDate'],course=data['course'],year_level=data['yearLevel'])
        return JsonResponse( { 'message' : 'success'} )
    except:
        return JsonResponse( { 'message' : 'failed'} )

def get_all_students(request):
    try:
        limit_per_page=request.GET['limit_per_page']
        current_page=request.GET['current_page']
        data=[]
        for a in Student.objects.all():
            data.append({
                'id': a.id,
                'firstName': a.first_name,
                'middleName': a.middle_name,
                'lastName': a.last_name,
                'birthDate': a.birthdate,
                'yearLevel': a.year_level,
                'course': a.course
            })
        # Implementing django's core paginator
        paginator=Paginator(data,limit_per_page)
        try:
            result= paginator.page(current_page)
        except PageNotAnInteger:
            print('page not integer')
            result= paginator.page(1)
        except EmptyPage:
            print('empty page')
            result = paginator.page(1)
        except InvalidPage:
            print('invalid page')
        page_info={
            'current_page': int(current_page),
            # if the current page is equal to first page or last page = next or prev page number is equal to 0 
            'next_page_number': 0 if not result.has_next() else result.next_page_number(),
            'prev_page_number': 0 if not result.has_previous() else result.previous_page_number(),
            'total_page' : int(paginator.num_pages),
            'total_count': paginator.count,
        }
        final_result = list(result)

        return JsonResponse( { 'message' : 'success', 'data': final_result, 'page_info': page_info} )
    except:
        return JsonResponse( { 'message' : 'failed'} )

def more_info(request):
    id=request.GET['id']
    try:
        student=Student.objects.get(id=id)
        data={
            'id': id,
            'firstName': student.first_name,
            'middleName': student.middle_name,
            'lastName': student.last_name,
            'birthDate': student.birthdate,
            'yearLevel': student.year_level,
            'course': student.course
        }
        return JsonResponse( { 'message' : 'success', 'data': data} )
    except:
        return JsonResponse( { 'message' : 'failed'} )

def delete_student(request):
    data = request.body.decode('utf8')
    data = json.loads(data)
    try:
        Student.objects.get(id=data['id']).delete()
        data=[]
        get_all_students(request)
        # for a in Student.objects.all():
        #     data.append({
        #         'id': a.id,
        #         'firstName': a.first_name,
        #         'middleName': a.middle_name,
        #         'lastName': a.last_name,
        #         'birthDate': a.birthdate,
        #         'yearLevel': a.year_level,
        #         'course': a.course
        #     })
        return JsonResponse( { 'message' : 'success','data':data} )
    except:
        return JsonResponse( { 'message' : 'failed'} )