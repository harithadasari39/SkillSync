from django.core.mail import send_mail
import random

def generate_and_send_otp(email):
    otp = str(random.randint(100000, 999999))
    send_mail(
        subject='Your OTP for SkillSync',
        message=f'Your OTP is: {otp}',
        from_email='pakac92@gmail.com',  # replace with your valid email
        recipient_list=[email],
        fail_silently=False
    )
    return otp