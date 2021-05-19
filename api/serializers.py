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


class CardiacSuppliedSerializer_A(serializers.ModelSerializer):
    class Meta:
        model = CardiacSupplied
        fields = (  'A_1_consumed','A_2A_consumed','A_2B_consumed','A_3A_consumed','A_3B_consumed',
                    'A_1_qty','A_2A_qty','A_2B_qty','A_3A_qty','A_3B_qty',
                    'A_1_qty_rcd','A_2A_qty_rcd','A_2B_qty_rcd','A_3A_qty_rcd','A_3B_qty_rcd',
                    'A_1_tally_nurse','A_2A_tally_nurse','A_2B_tally_nurse','A_3A_tally_nurse','A_3B_tally_nurse',
                    'A_1_tally_unitman','A_2A_tally_unitman','A_2B_tally_unitman','A_3A_tally_unitman','A_3B_tally_unitman',
                    'A_1_brand','A_2A_brand','A_2B_brand','A_3A_brand','A_3B_brand',
                    'A_1_descr','A_2A_descr','A_2B_descr','A_3A_descr','A_3B_descr',
)
# class UpdateCardiacSerializer(serializers.ModelSerializer):
#     #code = serializers.CharField(validators=[])
    
#     class Meta:
#         model = CardiacRequested
#         fields = ('__all__')
#         #exclude = ('request',)

