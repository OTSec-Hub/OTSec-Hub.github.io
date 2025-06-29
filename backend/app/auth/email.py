import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from fastapi import BackgroundTasks
from dotenv import load_dotenv

    
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT")),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=True,  # Explicitly set (for port 587)
    MAIL_SSL_TLS=False,  # Must be False when using STARTTLS
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_verification_email(
    email: str,
    name: str,
    token: str,
    temp_password: str,
    redirect_url: str,
    background_tasks: BackgroundTasks
):
    verification_url = f"{redirect_url}?token={token}"

    logo_url = "https://res.cloudinary.com/mano22/image/upload/v1751216813/logo_bkxcak.png"

    message = MessageSchema(
    subject="🔐 Your OTSEC-HUB Educator Account Credentials",
    recipients=[email],
    body=f"""
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Email Header -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #2a5233 100%); padding: 20px 20px; text-align: center; color: white;">
            <img src="{logo_url}" alt="OTSEC-HUB Logo" style="height: 60px; margin-bottom: 15px;">
            <h1 style="margin: 0; font-weight: 300;">Educator Account Setup</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #28a745; margin-top: 0;">Welcome, {name}!</h2>
            <p style="font-size: 16px; color: black; line-height: 1.6;">Your OTSEC-HUB educator account has been created. Here are your temporary credentials:</p>
            
            <!-- Credentials Box -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0; border-left: 5px solid #2a5233;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 30%; padding: 8px 0; color: #7f8c8d;">Email:</td>
                        <td style="padding: 8px 0; font-weight: 500;">{email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #7f8c8d;">Temporary Password:</td>
                        <td style="padding: 8px 0;">
                            <span style="background-color: #fff2f2; color: #e74c3c; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 1.1em;">
                                {temp_password}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Security Notice -->
            <div style="background-color: #fff8e6; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #ff9800;">⚠️ Security Notice</h4>
                <ul style="padding-left: 20px; margin-bottom: 0;">
                    <li>This is a one-time temporary password</li>
                    <li>You must change it after first login</li>
                    <li>Never share your credentials with anyone</li>
                </ul>
            </div>
            
            <!-- Action Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="{verification_url}" style="
                    background: linear-gradient(to right, #2a5233, #28a745);
                    color: white;
                    padding: 14px 28px;
                    text-decoration: none;
                    border-radius: 30px;
                    font-weight: bold;
                    font-size: 16px;
                    display: inline-block;
                    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
                    transition: all 0.3s ease;
                " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                    Activate Your Account
                </a>
            </div>
            
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #7f8c8d; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0;">©OTSEC-HUB. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Need help? <a href="mailto:support@otsec-hub.edu" style="color: #2a5233;">Contact our support team</a></p>
        </div>
    </div>
    """,
    subtype="html"
)
    
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)