from rest_framework import serializers
from .models import CardiacRequested, CardiacSupplied, Patient, Requests,User
from django.contrib.auth import authenticate

User._meta.get_field('username')._unique = True

# class UsersSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = User
#        fields = ('username','name','password')

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        # fields = ('name','wardadhaar','bloodgroup','gender','dob')
        fields = ('__all__')


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = ('__all__')


##-----------------------------------------------------------------------------------
#class CreateUsersSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Users
#        fields = ('username','password')

class CreatePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('wardadhaar')

class CreateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = ('docnumber')

#-------------------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','category','first_name','last_name')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'category', 'password','first_name','last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            category=validated_data['category'],
            password=validated_data['password'],
            last_name=validated_data['last_name']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class CardiacRequestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardiacRequested
        fields = '__all__'

class CardiacSuppliedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardiacSupplied
        fields = '__all__'

# class UpdateCardiacSerializer(serializers.ModelSerializer):
#     #code = serializers.CharField(validators=[])
    
#     class Meta:
#         model = CardiacRequested
#         fields = ('__all__')
#         #exclude = ('request',)

