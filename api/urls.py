from django.urls import path, include
from knox.views import LogoutView
from .views import CombineCardiacView,export_form,UpdateRequestRemarksView,GetPatientTable,GetPatients,PatientView,GetRequestTable,RequestView,LoginAPIView,ViewRequestTable,RegisterAPIView,ViewCardiacRequestTable, GetCardiacRequestTable,UpdateCardiacFormAView,UpdateCardiacFormBView, ViewCardiacSuppliedTable,UpdateCardiacSuppliedFormAView,UpdateCardiacSuppliedFormBView
urlpatterns = [
    # path('',include('frontend.urls')),
    # path('users',UsersView.as_view()),
    # path('get-user',GetOneUser.as_view()),
    # path('get-user-table',GetUserTable.as_view()),
    path('get-patient-table',GetPatientTable.as_view()),
    # path('get-request-table',GetRequestTable.as_view()),
    path('get-request-table/<str:docnumber>',GetRequestTable.as_view()),
    path('view-request-table',ViewRequestTable.as_view()),
    path('update-request-remarks/<str:docnumber>',UpdateRequestRemarksView.as_view()),
    
    path('patients',PatientView.as_view()),
    path('requests',RequestView.as_view()),
    path('login',LoginAPIView.as_view()),
    path('logout', LogoutView.as_view(), name='knox_logout'),
    path('register',RegisterAPIView.as_view()),
    # path('update-cardiac/<pk>', UpdateCardiac.as_view()),
    
    path('view-cardiac-request-table',ViewCardiacRequestTable.as_view()),
    path('get-cardiac-request-table/<str:docnumber>',GetCardiacRequestTable.as_view()),
    path('update-cardiac-forma/<str:docnumber>', UpdateCardiacFormAView.as_view()),
    path('update-cardiac-formb/<str:docnumber>', UpdateCardiacFormBView.as_view()),
    
    path('view-cardiac-supplied-table',ViewCardiacSuppliedTable.as_view()),
    path('update-cardiac-supplied-forma/<str:docnumber>', UpdateCardiacSuppliedFormAView.as_view()),
    path('update-cardiac-supplied-formb/<str:docnumber>', UpdateCardiacSuppliedFormBView.as_view()),

    path('combined-form/<str:docnumber>',CombineCardiacView.as_view()),
    path('get-form-xls/<str:docnumber>',export_form,name='export_form'),
]
