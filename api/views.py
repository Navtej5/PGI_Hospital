from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from .models import Patient, Requests , User, CardiacRequested
from .serializers import UserSerializer, RegisterSerializer,LoginSerializer, PatientSerializer, CreatePatientSerializer, RequestSerializer, CreateRequestSerializer, CardiacSerializer, UpdateCardiacSerializer #,
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
import math
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
            crnumber = serializer.data.get('crnumber')
            wardadhaar = serializer.data.get('wardadhaar')
            docnumber = serializer.data.get('docnumber')
            # createdby = serializer.data.get('') #THIS NEEDS TO CAPTURE THE USER NAME of who created this request
            # createdat = models.DateTimeField(auto_now_add=True)
            department = serializer.data.get('department')
            consultantuname = serializer.data.get('consultantuname')
            height = serializer.data.get('height')
            weight = serializer.data.get('weight')
            bsa = math.sqrt(float(height*weight)/float(3600))
            queryset = Requests.objects.filter(docnumber=docnumber)
            if len(queryset)>0:
                return Response({'BAD':'Duplicate Request with same Document Number'},status=status.HTTP_400_BAD_REQUEST)
            else:
                newRequest = Requests(crnumber=crnumber,wardadhaar=wardadhaar,docnumber=docnumber,department=department,consultantuname=consultantuname,height=height,weight=weight,bsa=bsa)
                newRequest.save()
                return Response({'GOOD':'entered new Request'},status=status.HTTP_201_CREATED)
        msg = serializer.errors
        return Response({'BAD':msg},status=status.HTTP_400_BAD_REQUEST)
# class CreateUsers(APIView):
#     serializer_class = CreateUsersSerializer
#     def post(self,request,format=None):
#         if not self.request.session.exists(self.request.session.session_key):
            
#         pass
#class GetUserTable(ListAPIView):
##    queryset = Users.objects.all()
#    serializer_class = UsersSerializer

class GetPatientTable(ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class GetRequestTable(ListAPIView):
    queryset = Requests.objects.all()
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
        

def main(request):
    return HttpResponse('Ninja')

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


class GetCardiacTable(CreateAPIView):
    queryset = CardiacRequested.objects.all()
    serializer_class = CardiacSerializer

class UpdateCardiac(UpdateAPIView):
    queryset = CardiacRequested.objects.all()
    serializer_class = UpdateCardiacSerializer
    #lookup_field = 'pk'

    def patch(self, request,pk, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            print("-------------------------------------------------------------------------------------------------------------")
            print(serializer.data)
            print("-------------------------------------------------------------------------------------------------------------")
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

            code = serializer.data.get('code')

            queryset = CardiacRequested.objects.filter(pk=pk)

            if not queryset.exists():
                print("\nCREATING NEW\n")
                newRow = CardiacRequested(
                request=code,
                A_1_brand=A_1_brand,A_1_descr=A_1_descr,A_1_qty=A_1_qty,
                A_2A_brand=A_2A_brand,A_2A_descr=A_2A_descr,A_2A_qty=A_2A_qty,
                A_2B_brand=A_2B_brand,A_2B_descr=A_2B_descr,A_2B_qty=A_2B_qty,
                A_3A_brand=A_3A_brand,A_3A_descr=A_3A_descr,A_3A_qty=A_3A_qty,
                A_3B_brand=A_3B_brand,A_3B_descr=A_3B_descr,A_3B_qty=A_3B_qty,
                )
                newRow.save()
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
                print(cardiacrequest.A_3A_descr,A_3A_descr,cardiacrequest.A_3A_brand,A_3A_brand,cardiacrequest.A_3A_qty,A_3A_qty)
                cardiacrequest.save(update_fields=['A_1_descr', 'A_1_brand','A_1_qty','A_2A_descr', 'A_2A_brand','A_2A_qty','A_2B_descr', 'A_2B_brand','A_2B_qty','A_3A_descr', 'A_3A_brand','A_3A_qty','A_3B_descr', 'A_3B_brand','A_3B_qty',])
                
                return Response(UpdateCardiacSerializer(cardiacrequest).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data...",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
