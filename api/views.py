from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status, viewsets
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from .models import Patient, Requests , User, CardiacRequested, CardiacSupplied
from .serializers import UserSerializer, RegisterSerializer,LoginSerializer, PatientSerializer, CreatePatientSerializer, RequestSerializer, CreateRequestSerializer, CardiacRequestedSerializer,CardiacSuppliedSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
import math
import xlwt
import csv
# Create your views here.


# class UsersView(CreateAPIView): #ListAPIView for just the data
#    queryset = User.objects.all()
#    serializer_class = UsersSerializer
class PatientView(CreateAPIView): #ListAPIView for just the data
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    def post(self, request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            wardadhaar = serializer.data.get('wardadhaar')
            bloodgroup = serializer.data.get('bloodgroup')
            gender = serializer.data.get('gender')
            dob = serializer.data.get('dob')
            queryset = Patient.objects.filter(wardadhaar = wardadhaar)
            if queryset.exists():
                return Response({'BAD':'Duplicate patient Adhaar Number'},status=status.HTTP_400_BAD_REQUEST)
            else:
                newPatient = Patient(name=name,wardadhaar=wardadhaar,bloodgroup=bloodgroup,gender=gender,dob=dob)
                newPatient.save()
                return Response({'GOOD':'all done, entered new patient'},status=status.HTTP_201_CREATED)
        msg = serializer.errors
        return Response({'BAD serializer':msg},status=status.HTTP_400_BAD_REQUEST)

class RequestView(APIView):
    queryset = Requests.objects.all()
    serializer_class = RequestSerializer
    def post(self, request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            docnumber = serializer.data.get('docnumber')
            queryset = Requests.objects.filter(docnumber=docnumber)
            if len(queryset)>0:
                return Response({'BAD':'Duplicate Request with same Document Number'},status=status.HTTP_400_BAD_REQUEST)
            # print("--------------------------------------")
            # print(request.data)
            # print('--------------------------------------')
            # print(serializer.data)
            patientname = serializer.data.get('patientname')
            # wardname = serializer.data['wardname']
            # patientname = request.data.get('wardname')
            state = serializer.data.get('state')
            crnumber = serializer.data.get('crnumber')
            wardadhaar = serializer.data.get('wardadhaar')
            # createdby = serializer.data.get('') #THIS NEEDS TO CAPTURE THE USER NAME of who created this request
            # createdat = models.DateTimeField(auto_now_add=True)
            department = serializer.data.get('department')
            consultantuname = serializer.data.get('consultantuname')
            height = serializer.data.get('height')
            weight = serializer.data.get('weight')
            # print("*********************************\n",patientname,"\n***************************")
            bsa = math.sqrt(float(height*weight)/float(3600))
            newRequest = Requests(crnumber=crnumber,wardadhaar=wardadhaar,
                docnumber=docnumber,department=department,consultantuname=consultantuname,
                height=height,weight=weight,bsa=bsa,
                patientname=patientname)
            newRequest.save()
            return Response({'GOOD':'entered new Request'},status=status.HTTP_201_CREATED)
        
        msg = serializer.errors
        return Response({'BAD':msg},status=status.HTTP_400_BAD_REQUEST)
    
class UpdateRequestRemarksView(RetrieveUpdateDestroyAPIView):
    queryset = Requests.objects.all()
    serializer_class = RequestSerializer
    lookup_field='docnumber'
    def patch(self, request,docnumber,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            queryset = Requests.objects.filter(docnumber=docnumber)
            row = queryset[0]
            # print("*********************************\n",patientname,"\n***************************")
            row.remarksfromconsultant = serializer.data.get('remarks',row.remarksfromconsultant)
            row.notificationbit = serializer.data.get('notificationbit',row.notificationbit)
            
            row.save(update_fields=[
                "remarksfromconsultant",
                "notificationbit"
            ])

            return Response({'GOOD':'OK'}, status=status.HTTP_200_OK)
        
        msg = serializer.errors
        return Response({'BAD':msg},status=status.HTTP_400_BAD_REQUEST)

# class CreateUsers(APIView):
#     serializer_class = CreateUsersSerializer
#     def post(self,request,format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#         pass
#   class GetUserTable(ListAPIView):
##    queryset = Users.objects.all()
#    serializer_class = UsersSerializer

class GetPatientTable(ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


# class GetRequestTable(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Requests.objects.all()
#     lookup_url_kwarg = 'docnumber'
#     serializer_class = RequestSerializer

class ViewRequestTable(ListAPIView):
    queryset = Requests.objects.all()
    serializer_class = RequestSerializer

class GetRequestTable(generics.RetrieveUpdateDestroyAPIView):
    queryset = Requests.objects.all()
    lookup_url_kwarg = 'docnumber'
    serializer_class = RequestSerializer

#class GetUsers(APIView):
#    serializer_class = CreateUsersSerializer
#    def post(self, request, format=None):
#        if not self.request.session.exists(self.request.session.session_key):
#            self.request.session.create()
#        
#        serializer = self.serializer_class(data=request.data)
#        if serializer.is_valid():
#            username = serializer.data.username
#            password = serializer.data.password3
#
#        return Response(UsersSerializer(Users).data)

class GetPatients(APIView):
    serializer_class = CreatePatientSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # username = serializer.data.username
            # password = serializer.data.password
            wardaadhar = serializer.data.wardaadhar

        return Response(PatientSerializer(Patient).data)


#class GetOneUser(APIView):
#    serializer_class = UsersSerializer
#    lookup_url_kwarg = 'username'#
#
#
#    def get(self,request,format=None):
#        username = request.GET.get(self.lookup_url_kwarg)
#        if username != None:
#            entry = Users.objects.filter(username=username)
#            if len(entry)>0:
#                data = UsersSerializer(entry[0]).data
#                # data['is_host'] = self.request.session.session_key == entry[0].host
#                return Response(data,status=status.HTTP_200_OK)
#            return Response({'Data not found':'Code parameter not found'},status=status.HTTP_404_NOT_FOUND)
#        return Response({'Bad request':'Code parameter bad'},status=status.HTTP_400_BAD_REQUEST)
        

# def main(request):
#     return HttpResponse('Ninja')

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class ViewCardiacRequestTable(ListAPIView):
    queryset = CardiacRequested.objects.all()
    serializer_class = CardiacRequestedSerializer

class GetCardiacRequestTable(generics.RetrieveUpdateDestroyAPIView):
    queryset = CardiacRequested.objects.all()
    lookup_url_kwarg = 'docnumber'
    serializer_class = CardiacRequestedSerializer
    

    
class ViewCardiacSuppliedTable(ListAPIView):
    queryset = CardiacSupplied.objects.all()
    serializer_class = CardiacSuppliedSerializer


# class GetCardiacRequestTable(RetrieveUpdateDestroyAPIView):
#     queryset = CardiacRequested.objects.all()
#     serializer_class = CardiacSerializer



# class UpdateCardiac(UpdateAPIView):
#     serializer_class = CardiacRequestedSerializer

class UpdateCardiacFormAView(RetrieveUpdateDestroyAPIView):
    queryset = CardiacRequested.objects.all()
    serializer_class = CardiacRequestedSerializer
    lookup_field = 'docnumber'
    
    def patch(self, request, docnumber, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        print("docnumber jo mila hai =======>> ",docnumber)
        if serializer.is_valid():
            print("-------------------------------------------------------------------------------------------------------------")
            print(serializer.data)
            print("-------------------------------------------------------------------------------------------------------------")
            code = serializer.data.get('code')
            A_1_descr = serializer.data.get('A_1_descr')
            A_1_brand = serializer.data.get('A_1_brand')
            A_1_qty = serializer.data.get('A_1_qty')
            A_2A_descr = serializer.data.get('A_2A_descr')
            A_2A_brand = serializer.data.get('A_2A_brand')
            A_2A_qty = serializer.data.get('A_2A_qty')
            A_2B_descr = serializer.data.get('A_2B_descr')
            A_2B_brand = serializer.data.get('A_2B_brand')
            A_2B_qty = serializer.data.get('A_2B_qty')
            A_3A_descr = serializer.data.get('A_3A_descr')
            A_3A_brand = serializer.data.get('A_3A_brand')
            A_3A_qty = serializer.data.get('A_3A_qty')
            A_3B_descr = serializer.data.get('A_3B_descr')
            A_3B_brand = serializer.data.get('A_3B_brand')
            A_3B_qty = serializer.data.get('A_3B_qty')


            queryset = CardiacRequested.objects.filter(docnumber = docnumber)
            print("length ========================> ",len(queryset))

            if not queryset.exists():
                print("\n*************\nCREATING NEW",docnumber,"\n******************\n")
                newRow = CardiacRequested(
                docnumber=docnumber,
                # docnumber=Requests.objects.get(docnumber=docnumber),
                A_1_brand=A_1_brand,A_1_descr=A_1_descr,A_1_qty=A_1_qty,
                A_2A_brand=A_2A_brand,A_2A_descr=A_2A_descr,A_2A_qty=A_2A_qty,
                A_2B_brand=A_2B_brand,A_2B_descr=A_2B_descr,A_2B_qty=A_2B_qty,
                A_3A_brand=A_3A_brand,A_3A_descr=A_3A_descr,A_3A_qty=A_3A_qty,
                A_3B_brand=A_3B_brand,A_3B_descr=A_3B_descr,A_3B_qty=A_3B_qty,
                )
                newRow.save()

                newSuppliedRow = CardiacSupplied(
                    docnumber=docnumber
                )
                newSuppliedRow.save()
                print("\n***** \nDONE \n****\n")
                return Response({'msg': 'created new entry'}, status=status.HTTP_201_CREATED)
                

            else:
                print("\nUPDATING EXISTING\n")
                cardiacrequest = queryset[0]
                user_id = self.request.session.session_key
                #if room.host != user_id:
                #    return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

                cardiacrequest.A_1_descr = A_1_descr
                cardiacrequest.A_1_brand = A_1_brand
                cardiacrequest.A_1_qty = A_1_qty
                cardiacrequest.A_2A_descr = A_2A_descr
                cardiacrequest.A_2A_brand = A_2A_brand
                cardiacrequest.A_2A_qty = A_2A_qty
                cardiacrequest.A_2B_descr = A_2B_descr
                cardiacrequest.A_2B_brand = A_2B_brand
                cardiacrequest.A_2B_qty = A_2B_qty
                cardiacrequest.A_3A_descr = A_3A_descr
                cardiacrequest.A_3A_brand = A_3A_brand
                cardiacrequest.A_3A_qty = A_3A_qty
                cardiacrequest.A_3B_descr = A_3B_descr
                cardiacrequest.A_3B_brand = A_3B_brand
                cardiacrequest.A_3B_qty = A_3B_qty
                cardiacrequest.save(update_fields=[
                    'A_1_descr', 'A_1_brand','A_1_qty',
                    'A_2A_descr', 'A_2A_brand','A_2A_qty',
                    'A_2B_descr', 'A_2B_brand','A_2B_qty',
                    'A_3A_descr', 'A_3A_brand','A_3A_qty',
                    'A_3B_descr', 'A_3B_brand','A_3B_qty',
                ])
                
                return Response(CardiacRequestedSerializer(cardiacrequest).data, status=status.HTTP_200_OK)
        print("serializer not VALID",serializer.errors)
        return Response({'Bad Request': "Invalid Data...",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UpdateCardiacFormBView(RetrieveUpdateDestroyAPIView):
    queryset = CardiacRequested.objects.all()
    serializer_class = CardiacRequestedSerializer
    lookup_field = 'docnumber'

    def patch(self, request, docnumber, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            print("-------------------------------------------------------------------------------------------------------------")
            print(serializer.data)
            print("-------------------------------------------------------------------------------------------------------------")
            code = serializer.data.get('code')

            B_1_descr = serializer.data.get('B_1_descr',None)
            B_1_brand = serializer.data.get('B_1_brand',None)
            B_1_qty = serializer.data.get('B_1_qty',None)
            B_2A_descr = serializer.data.get('B_2A_descr',None)
            B_2A_brand = serializer.data.get('B_2A_brand',None)
            B_2A_qty = serializer.data.get('B_2A_qty',None)
            B_2B_descr = serializer.data.get('B_2B_descr',None)
            B_2B_brand = serializer.data.get('B_2B_brand',None)
            B_2B_qty = serializer.data.get('B_2B_qty',None)
            B_3A_descr = serializer.data.get('B_3A_descr',None)
            B_3A_brand = serializer.data.get('B_3A_brand',None)
            B_3A_qty = serializer.data.get('B_3A_qty',None)
            B_3B_descr = serializer.data.get('B_3B_descr',None)
            B_3B_brand = serializer.data.get('B_3B_brand',None)
            B_3B_qty = serializer.data.get('B_3B_qty',None)
            B_3C_descr = serializer.data.get('B_3C_descr',None)
            B_3C_brand = serializer.data.get('B_3C_brand',None)
            B_3C_qty = serializer.data.get('B_3C_qty',None)
            B_3D_descr = serializer.data.get('B_3D_descr',None)
            B_3D_brand = serializer.data.get('B_3D_brand',None)
            B_3D_qty = serializer.data.get('B_3D_qty')

            queryset = CardiacRequested.objects.filter(docnumber = docnumber)

            if not queryset.exists():
                print("\n**************************************\nCREATING NEW",docnumber,"\n*****************************************************\n")
                newRow = CardiacRequested(
                # docnumber=Requests.objects.get(docnumber=docnumber),
                docnumber=docnumber,
                B_1_brand=B_1_brand,B_1_descr=B_1_descr,B_1_qty=B_1_qty,
                B_2A_brand=B_2A_brand,B_2A_descr=B_2A_descr,B_2A_qty=B_2A_qty,
                B_2B_brand=B_2B_brand,B_2B_descr=B_2B_descr,B_2B_qty=B_2B_qty,
                B_3A_brand=B_3A_brand,B_3A_descr=B_3A_descr,B_3A_qty=B_3A_qty,
                B_3B_brand=B_3B_brand,B_3B_descr=B_3B_descr,B_3B_qty=B_3B_qty,
                B_3C_brand=B_3C_brand,B_3C_descr=B_3C_descr,B_3C_qty=B_3C_qty,
                B_3D_brand=B_3D_brand,B_3D_descr=B_3D_descr,B_3D_qty=B_3D_qty,
                )
                newRow.save()
                newSuppliedRow = CardiacSupplied(
                    docnumber=docnumber
                )
                newSuppliedRow.save()
                print("\n************ \nDONE \n***********\n")
                return Response({'msg': 'created new entry'}, status=status.HTTP_201_CREATED)
                

            else:
                print("\nUPDATING EXISTING\n")
                cardiacrequest = queryset[0]
                user_id = self.request.session.session_key
                #if room.host != user_id:
                #    return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

                cardiacrequest.B_1_descr = B_1_descr
                cardiacrequest.B_1_brand = B_1_brand
                cardiacrequest.B_1_qty = B_1_qty
                cardiacrequest.B_2A_descr = B_2A_descr
                cardiacrequest.B_2A_brand = B_2A_brand
                cardiacrequest.B_2A_qty = B_2A_qty
                cardiacrequest.B_2B_descr = B_2B_descr
                cardiacrequest.B_2B_brand = B_2B_brand
                cardiacrequest.B_2B_qty = B_2B_qty
                cardiacrequest.B_3A_descr = B_3A_descr
                cardiacrequest.B_3A_brand = B_3A_brand
                cardiacrequest.B_3A_qty = B_3A_qty
                cardiacrequest.B_3B_descr = B_3B_descr
                cardiacrequest.B_3B_brand = B_3B_brand
                cardiacrequest.B_3B_qty = B_3B_qty
                cardiacrequest.B_3C_descr = B_3C_descr
                cardiacrequest.B_3C_brand = B_3C_brand
                cardiacrequest.B_3C_qty = B_3C_qty
                cardiacrequest.B_3D_descr = B_3D_descr
                cardiacrequest.B_3D_brand = B_3D_brand
                cardiacrequest.B_3D_qty = B_3D_qty
                # print(cardiacrequest.A_3A_descr,A_3A_descr,cardiacrequest.A_3A_brand,A_3A_brand,cardiacrequest.A_3A_qty,A_3A_qty)
                cardiacrequest.save(update_fields=[
                    'B_1_descr', 'B_1_brand','B_1_qty',
                    'B_2A_descr', 'B_2A_brand','B_2A_qty',
                    'B_2B_descr', 'B_2B_brand','B_2B_qty',
                    'B_3A_descr', 'B_3A_brand','B_3A_qty',
                    'B_3B_descr', 'B_3B_brand','B_3B_qty',
		            'B_3C_descr', 'B_3C_brand','B_3C_qty',
                    'B_3D_descr', 'B_3D_brand','B_3D_qty',
                ])
                
                return Response(CardiacRequestedSerializer(cardiacrequest).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data...",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




class UpdateCardiacSuppliedFormAView(RetrieveUpdateDestroyAPIView):
    queryset = CardiacSupplied.objects.all()
    serializer_class = CardiacSuppliedSerializer
    lookup_field = 'docnumber'
    
    def patch(self, request, docnumber, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            print("-------------------------------------------------------------------------------------------------------------")
            print(serializer.data)
            print("-------------------------------------------------------------------------------------------------------------")
            code = serializer.data.get('code')

            queryset = CardiacSupplied.objects.filter(docnumber = docnumber)

            if not queryset.exists():
                print("\n*************\nCREATING NEW",docnumber,"\n******************\n")
                A_1_descr = serializer.data.get('A_1_descr')
                A_1_brand = serializer.data.get('A_1_brand')
                A_1_qty = serializer.data.get('A_1_qty')
                A_1_qty_rcd = serializer.data.get('A_1_qty_rcd')

                A_2A_descr = serializer.data.get('A_2A_descr')
                A_2A_brand = serializer.data.get('A_2A_brand')
                A_2A_qty = serializer.data.get('A_2A_qty')
                A_2A_qty_rcd = serializer.data.get('A_2A_qty_rcd')

                A_2B_descr = serializer.data.get('A_2B_descr')
                A_2B_brand = serializer.data.get('A_2B_brand')
                A_2B_qty = serializer.data.get('A_2B_qty')
                A_2B_qty_rcd = serializer.data.get('A_2B_qty_rcd')
                
                A_3A_descr = serializer.data.get('A_3A_descr')
                A_3A_brand = serializer.data.get('A_3A_brand')
                A_3A_qty = serializer.data.get('A_3A_qty')
                A_3A_qty_rcd = serializer.data.get('A_3A_qty_rcd')

                A_3B_descr = serializer.data.get('A_3B_descr')
                A_3B_brand = serializer.data.get('A_3B_brand')
                A_3B_qty = serializer.data.get('A_3B_qty')
                A_3B_qty_rcd = serializer.data.get('A_3B_qty_rcd')

                newRow = CardiacSupplied(
                # docnumber=Requests.objects.get(docnumber=docnumber),
                docnumber=docnumber,
                A_1_brand = A_1_brand,A_1_descr = A_1_descr,A_1_qty = A_1_qty,A_1_qty_rcd = A_1_qty_rcd,
                A_2A_brand=A_2A_brand,A_2A_descr=A_2A_descr,A_2A_qty=A_2A_qty,A_2A_qty_rcd=A_2A_qty_rcd,
                A_2B_brand=A_2B_brand,A_2B_descr=A_2B_descr,A_2B_qty=A_2B_qty,A_2B_qty_rcd=A_2B_qty_rcd,
                A_3A_brand=A_3A_brand,A_3A_descr=A_3A_descr,A_3A_qty=A_3A_qty,A_3A_qty_rcd=A_3A_qty_rcd,
                A_3B_brand=A_3B_brand,A_3B_descr=A_3B_descr,A_3B_qty=A_3B_qty,A_3B_qty_rcd=A_3B_qty_rcd,
                )
                newRow.save()
                print("\n***** \nDONE \n****\n")
                return Response({'msg': 'created new entry'}, status=status.HTTP_201_CREATED)
                

            else:
                print("\nUPDATING EXISTING\n")
                cardiacsupply = queryset[0]
                user_id = self.request.session.session_key
                #if room.host != user_id:
                #    return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

                cardiacsupply.A_1_descr = serializer.data.get('A_1_descr',cardiacsupply.A_1_descr)
                cardiacsupply.A_1_brand = serializer.data.get('A_1_brand',cardiacsupply.A_1_brand)
                cardiacsupply.A_1_qty = serializer.data.get('A_1_qty',cardiacsupply.A_1_qty)
                cardiacsupply.A_1_qty_rcd = serializer.data.get('A_1_qty_rcd',cardiacsupply.A_1_qty_rcd)
                
                cardiacsupply.A_2A_descr = serializer.data.get('A_2A_descr',cardiacsupply.A_2A_descr)
                cardiacsupply.A_2A_brand = serializer.data.get('A_2A_brand',cardiacsupply.A_2A_brand)
                cardiacsupply.A_2A_qty = serializer.data.get('A_2A_qty',cardiacsupply.A_2A_qty)
                cardiacsupply.A_2A_qty_rcd = serializer.data.get('A_2A_qty_rcd',cardiacsupply.A_2A_qty_rcd)

                cardiacsupply.A_2B_descr = serializer.data.get('A_2B_descr',cardiacsupply.A_2B_descr)
                cardiacsupply.A_2B_brand = serializer.data.get('A_2B_brand',cardiacsupply.A_2B_brand)
                cardiacsupply.A_2B_qty = serializer.data.get('A_2B_qty',cardiacsupply.A_2B_qty)
                cardiacsupply.A_2B_qty_rcd = serializer.data.get('A_2B_qty_rcd',cardiacsupply.A_2B_qty_rcd)
                
                cardiacsupply.A_3A_descr = serializer.data.get('A_3A_descr',cardiacsupply.A_3A_descr)
                cardiacsupply.A_3A_brand = serializer.data.get('A_3A_brand',cardiacsupply.A_3A_brand)
                cardiacsupply.A_3A_qty = serializer.data.get('A_3A_qty',cardiacsupply.A_3A_qty)
                cardiacsupply.A_3A_qty_rcd = serializer.data.get('A_3A_qty_rcd',cardiacsupply.A_3A_qty_rcd)
                
                cardiacsupply.A_3B_descr = serializer.data.get('A_3B_descr',cardiacsupply.A_3B_descr)
                cardiacsupply.A_3B_brand = serializer.data.get('A_3B_brand',cardiacsupply.A_3B_brand)
                cardiacsupply.A_3B_qty = serializer.data.get('A_3B_qty',cardiacsupply.A_3B_qty)
                cardiacsupply.A_3B_qty_rcd = serializer.data.get('A_3B_qty_rcd',cardiacsupply.A_3B_qty_rcd)
                
                
                cardiacsupply.save(update_fields=[
                    'A_1_descr', 'A_1_brand','A_1_qty','A_1_qty_rcd',
                    'A_2A_descr', 'A_2A_brand','A_2A_qty','A_2A_qty_rcd',
                    'A_2B_descr', 'A_2B_brand','A_2B_qty','A_2B_qty_rcd',
                    'A_3A_descr', 'A_3A_brand','A_3A_qty','A_3A_qty_rcd',
                    'A_3B_descr', 'A_3B_brand','A_3B_qty','A_3B_qty_rcd',
                ])
                
                return Response(CardiacSuppliedSerializer(cardiacsupply).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data...",'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)

class UpdateCardiacSuppliedFormBView(RetrieveUpdateDestroyAPIView):
    queryset = CardiacSupplied.objects.all()
    serializer_class = CardiacSuppliedSerializer
    lookup_field = 'docnumber'

    def patch(self, request, docnumber, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            print("-------------------------------------------------------------------------------------------------------------")
            print(serializer.data)
            print("-------------------------------------------------------------------------------------------------------------")
            code = serializer.data.get('code')

            queryset = CardiacSupplied.objects.filter(docnumber = docnumber)

            if not queryset.exists():
                print("\n**************************************\nCREATING NEW",docnumber,"\n*****************************************************\n")
                B_1_descr = serializer.data.get('B_1_descr',None)
                B_1_brand = serializer.data.get('B_1_brand',None)
                B_1_qty = serializer.data.get('B_1_qty',None)
                B_1_qty_rcd = serializer.data.get('B_1_qty_rcd',None)

                B_2A_descr = serializer.data.get('B_2A_descr',None)
                B_2A_brand = serializer.data.get('B_2A_brand',None)
                B_2A_qty = serializer.data.get('B_2A_qty',None)
                B_2A_qty_rcd = serializer.data.get('B_2A_qty_rcd',None)

                B_2B_descr = serializer.data.get('B_2B_descr',None)
                B_2B_brand = serializer.data.get('B_2B_brand',None)
                B_2B_qty = serializer.data.get('B_2B_qty',None)
                B_2B_qty_rcd = serializer.data.get('B_2B_qty_rcd',None)

                B_3A_descr = serializer.data.get('B_3A_descr',None)
                B_3A_brand = serializer.data.get('B_3A_brand',None)
                B_3A_qty = serializer.data.get('B_3A_qty',None)
                B_3A_qty_rcd = serializer.data.get('B_3A_qty_rcd',None)

                B_3B_descr = serializer.data.get('B_3B_descr',None)
                B_3B_brand = serializer.data.get('B_3B_brand',None)
                B_3B_qty = serializer.data.get('B_3B_qty',None)
                B_3B_qty_rcd = serializer.data.get('B_3B_qty_rcd',None)

                B_3C_descr = serializer.data.get('B_3C_descr',None)
                B_3C_brand = serializer.data.get('B_3C_brand',None)
                B_3C_qty = serializer.data.get('B_3C_qty',None)
                B_3C_qty_rcd = serializer.data.get('B_3C_qty_rcd',None)

                B_3D_descr = serializer.data.get('B_3D_descr',None)
                B_3D_brand = serializer.data.get('B_3D_brand',None)
                B_3D_qty = serializer.data.get('B_3D_qty')
                B_3D_qty_rcd = serializer.data.get('B_3D_qty_rcd')
                
                newRow = CardiacSupplied(
                # docnumber=Requests.objects.get(docnumber=docnumber), #foreign needs an instance to be passed as value and not the value itself
                docnumber=docnumber,
                B_1_brand=B_1_brand,B_1_descr=B_1_descr,B_1_qty=B_1_qty,B_1_qty_rcd=B_1_qty_rcd,
                B_2A_brand=B_2A_brand,B_2A_descr=B_2A_descr,B_2A_qty=B_2A_qty,B_2A_qty_rcd=B_2A_qty_rcd,
                B_2B_brand=B_2B_brand,B_2B_descr=B_2B_descr,B_2B_qty=B_2B_qty,B_2B_qty_rcd=B_2B_qty_rcd,
                B_3A_brand=B_3A_brand,B_3A_descr=B_3A_descr,B_3A_qty=B_3A_qty,B_3A_qty_rcd=B_3A_qty_rcd,
                B_3B_brand=B_3B_brand,B_3B_descr=B_3B_descr,B_3B_qty=B_3B_qty,B_3B_qty_rcd=B_3B_qty_rcd,
                B_3C_brand=B_3C_brand,B_3C_descr=B_3C_descr,B_3C_qty=B_3C_qty,B_3C_qty_rcd=B_3C_qty_rcd,
                B_3D_brand=B_3D_brand,B_3D_descr=B_3D_descr,B_3D_qty=B_3D_qty,B_3D_qty_rcd=B_3D_qty_rcd,
                )
                newRow.save()
                print("\n************ \nDONE \n***********\n")
                return Response({'msg': 'created new entry'}, status=status.HTTP_201_CREATED)
                

            else:
                print("\nUPDATING EXISTING\n")
                cardiacsupply = queryset[0]
                user_id = self.request.session.session_key
                #if room.host != user_id:
                #    return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

                cardiacsupply.B_1_descr = serializer.data.get('B_1_descr',cardiacsupply.B_1_descr)
                cardiacsupply.B_1_brand = serializer.data.get('B_1_brand',cardiacsupply.B_1_brand)
                cardiacsupply.B_1_qty = serializer.data.get('B_1_qty',cardiacsupply.B_1_qty)
                cardiacsupply.B_1_qty_rcd = serializer.data.get('B_1_qty_rcd',cardiacsupply.B_1_qty_rcd)

                cardiacsupply.B_2A_descr = serializer.data.get('B_2A_descr',cardiacsupply.B_2A_descr)
                cardiacsupply.B_2A_brand = serializer.data.get('B_2A_brand',cardiacsupply.B_2A_brand)
                cardiacsupply.B_2A_qty = serializer.data.get('B_2A_qty',cardiacsupply.B_2A_qty)
                cardiacsupply.B_2A_qty_rcd = serializer.data.get('B_2A_qty_rcd',cardiacsupply.B_2A_qty_rcd)

                cardiacsupply.B_2B_descr = serializer.data.get('B_2B_descr',cardiacsupply.B_2B_descr)
                cardiacsupply.B_2B_brand = serializer.data.get('B_2B_brand',cardiacsupply.B_2B_brand)
                cardiacsupply.B_2B_qty = serializer.data.get('B_2B_qty',cardiacsupply.B_2B_qty)
                cardiacsupply.B_2B_qty_rcd = serializer.data.get('B_2B_qty_rcd',cardiacsupply.B_2B_qty_rcd)

                cardiacsupply.B_3A_descr = serializer.data.get('B_3A_descr',cardiacsupply.B_3A_descr)
                cardiacsupply.B_3A_brand = serializer.data.get('B_3A_brand',cardiacsupply.B_3A_brand)
                cardiacsupply.B_3A_qty = serializer.data.get('B_3A_qty',cardiacsupply.B_3A_qty)
                cardiacsupply.B_3A_qty_rcd = serializer.data.get('B_3A_qty_rcd',cardiacsupply.B_3A_qty_rcd)

                cardiacsupply.B_3B_descr = serializer.data.get('B_3B_descr',cardiacsupply.B_3B_descr)
                cardiacsupply.B_3B_brand = serializer.data.get('B_3B_brand',cardiacsupply.B_3B_brand)
                cardiacsupply.B_3B_qty = serializer.data.get('B_3B_qty',cardiacsupply.B_3B_qty)
                cardiacsupply.B_3B_qty_rcd = serializer.data.get('B_3B_qty_rcd',cardiacsupply.B_3B_qty_rcd)

                cardiacsupply.B_3C_descr = serializer.data.get('B_3C_descr',cardiacsupply.B_3C_descr)
                cardiacsupply.B_3C_brand = serializer.data.get('B_3C_brand',cardiacsupply.B_3C_brand)
                cardiacsupply.B_3C_qty = serializer.data.get('B_3C_qty',cardiacsupply.B_3C_qty)
                cardiacsupply.B_3C_qty_rcd = serializer.data.get('B_3C_qty_rcd',cardiacsupply.B_3C_qty_rcd)

                cardiacsupply.B_3D_descr = serializer.data.get('B_3D_descr',cardiacsupply.B_3D_descr)
                cardiacsupply.B_3D_brand = serializer.data.get('B_3D_brand',cardiacsupply.B_3D_brand)
                cardiacsupply.B_3D_qty = serializer.data.get('B_3D_qty',cardiacsupply.B_3D_qty)
                cardiacsupply.B_3D_qty_rcd = serializer.data.get('B_3D_qty_rcd',cardiacsupply.B_3D_qty_rcd)

                
                # print(cardiacsupply.A_3A_descr,A_3A_descr,cardiacsupply.A_3A_brand,A_3A_brand,cardiacsupply.A_3A_qty,A_3A_qty)
                cardiacsupply.save(update_fields=[
                    'B_1_descr', 'B_1_brand','B_1_qty','B_1_qty_rcd',
                    'B_2A_descr', 'B_2A_brand','B_2A_qty','B_2A_qty_rcd',
                    'B_2B_descr', 'B_2B_brand','B_2B_qty','B_2B_qty_rcd',
                    'B_3A_descr', 'B_3A_brand','B_3A_qty','B_3A_qty_rcd',
                    'B_3B_descr', 'B_3B_brand','B_3B_qty','B_3B_qty_rcd',
		            'B_3C_descr', 'B_3C_brand','B_3C_qty','B_3C_qty_rcd',
                    'B_3D_descr', 'B_3D_brand','B_3D_qty','B_3D_qty_rcd',
                ])
                
                return Response(CardiacSuppliedSerializer(cardiacsupply).data, status=status.HTTP_200_OK)

        return Response({'Bad request': "Invalid Data...",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class CombineCardiacView(ListAPIView):
    serializer_class_request = CardiacRequestedSerializer
    serializer_class_supply =  CardiacSuppliedSerializer
    lookup_field = 'docnumber'

    def get_queryset_request(self,docnumber):
        return CardiacRequested.objects.filter(docnumber=docnumber)
    def get_queryset_supply(self,docnumber):
        return CardiacSupplied.objects.filter(docnumber=docnumber)

    def list(self, request, docnumber, *args, **kwargs):
        requested = self.serializer_class_request(self.get_queryset_request(docnumber=docnumber), many=True)
        supplied = self.serializer_class_supply(self.get_queryset_supply(docnumber=docnumber), many=True)
        #print(supply.data.get('A_1_name'))
        print("======= request ===================\ndocnumber =",docnumber,"\n",self.request)
        return Response({
            "**Requested**": requested.data,
            "**Supplied**": supplied.data
        })


# def export_form(request, docnumber):
#     serializer_class = CardiacRequestedSerializer
#     lookup_url_kwarg = 'docnumber'
#     queryset = CardiacRequested.objects.filter(docnumber=docnumber)
#     response = HttpResponse(content_type='application/ms-excel')
#     response['Content-Disposition'] = 'attachment; filename="form.xls"'

#     wb = xlwt.Workbook(encoding='utf-8')
#     ws = wb.add_sheet('Form')

#     # Sheet header, first row
#     row_num = 3

#     font_style = xlwt.XFStyle()
#     font_style.font.bold = True

#     columns = ['Name','Description','Brand','Quantity', ]

#     for col_num in range(len(columns)):
#         ws.write(0, col_num, columns[col_num], font_style)

#     # Sheet body, remaining rows
#     font_style = xlwt.XFStyle()

#     rows = queryset[0] #CardiacRequested.objects.all().values_list('name', 'description', 'brand', 'quantity')
#     col_num = -2
#     # print(queryset.values_list())
#     for y in queryset.values_list():
#         # print(" y ===>",y)
#         for x in y: 
#             row_num += 1
#             col_num += 1
#             print(row_num//4, col_num%4,x)
#             if col_num > -1:
#                 ws.write(row_num//4, col_num%4, x, font_style)
#             else:
#                 row_num -= 1

#     print(ws)
#     wb.save(response)
#     return response



def export_form(request, docnumber):
    serializer_class = CardiacRequestedSerializer
    serializer_class2 = RequestSerializer
    lookup_url_kwarg = 'docnumber'
    queryset = CardiacRequested.objects.filter(docnumber=docnumber)
    requestset = Requests.objects.filter(docnumber=docnumber)
    # requestset = requestset[0]
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="form.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Form')

    # Sheet header, first row
    row_num = 0

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    columns = ['Name','Description','Brand','Quantity', ]
    ws.write(row_num,0,"Patient Name",font_style)
    ws.write(row_num,1,"Adhaar Number",font_style)
    ws.write(row_num,2,"Document Number",font_style)
    ws.write(row_num,3,"CR Number",font_style)
    row_num+=1
    ws.write(row_num,0,requestset[0].patientname,font_style)
    ws.write(row_num,1,requestset[0].wardadhaar,font_style)
    ws.write(row_num,2,requestset[0].docnumber,font_style)
    ws.write(row_num,3,requestset[0].crnumber,font_style)
    row_num+=3

    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)
    
    # row_num+=8
    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    
    # rows = queryset[0] #CardiacRequested.objects.all().values_list('name', 'description', 'brand', 'quantity')
    row_num += 2
    col_num = -2
    row_num *= 4
    row_num-=1
    # print(queryset.values_list())
    print("initial state :", row_num,col_num)
    for y in queryset.values_list():
        # print(" y ===>",y)
        for x in y: 
            row_num += 1
            col_num += 1
            print(row_num//4, col_num%4,x)
            if col_num > -1:
                ws.write(row_num//4, col_num%4, x, font_style)
            else:
                row_num -= 1
    row_num = row_num//4
    row_num += 5
    
    # ws.write(row_num,0,"Patient Name",font_style)
    # ws.write(row_num,1,"Adhaar Number",font_style)
    # ws.write(row_num,2,"Document Number",font_style)
    # ws.write(row_num,3,"CR Number",font_style)
    # row_num+=1
    # ws.write(row_num,0,requestset[0].patientname,font_style)
    # ws.write(row_num,1,requestset[0].wardadhaar,font_style)
    # ws.write(row_num,2,requestset[0].docnumber,font_style)
    # ws.write(row_num,3,requestset[0].crnumber,font_style)
    # print(requestset[0].patientname)
    wb.save(response)
    return response



