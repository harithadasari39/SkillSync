from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student, OTP
from .serializers import StudentSerializer
from .utils import generate_and_send_otp
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

# @api_view(['POST'])
# def send_otp(request):
#     email = request.data.get('email')
#     otp = generate_and_send_otp(email)
#     OTP.objects.create(phone_or_email=email, otp_code=otp)
#     return Response({'message': 'OTP sent'})

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def send_otp(request):
    email = request.data.get('email')
    phone = request.data.get('phone')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    otp = generate_and_send_otp(email)
    OTP.objects.create(phone_or_email=email, otp_code=otp)

    return Response({"message": f"OTP sent to {email}"})

# @api_view(['POST'])
# def verify_otp(request):
#     email = request.data.get('email')
#     otp = request.data.get('otp')
#     try:
#         otp_obj = OTP.objects.filter(phone_or_email=email).latest('created_at')
#         if otp_obj.otp_code == otp:
#             student = Student.objects.get(email=email)
#             student.is_verified = True
#             student.save()
#             tokens = get_tokens_for_user(student)
#             return Response({'message': 'Verified successfully','tokens': tokens})
#         return Response({'error': 'Invalid OTP'}, status=400)
#     except:
#         return Response({'error': 'Verification failed'}, status=400)

@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    try:
        recent_otp = OTP.objects.filter(phone_or_email=email).latest('created_at')
        if recent_otp.otp_code == otp:
            student = Student.objects.get(email=email)
            student.is_verified = True
            student.save()
            tokens = get_tokens_for_user(student)
            return Response({
                "message": "OTP verified. Login success.",
                "tokens": tokens
            })
        else:
            return Response({"error": "Invalid OTP"}, status=400)
    except:
        return Response({"error": "Verification failed"}, status=400)
