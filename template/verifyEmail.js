const verifyEmail = (otp) => {
    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        
        <h2 style="color: #2c3e50; text-align: center;">Verify Your Email Address</h2>
        
        <p>Thanks for signing up! We're excited to have you on board. Use the OTP code below to verify your email address:</p>

        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 28px; letter-spacing: 5px; font-weight: bold; color: #4CAF50; background: #f4f4f4; padding: 12px 20px; border-radius: 6px; display: inline-block;">
                ${otp}
            </span>
        </div>

        <p style="text-align: center; font-size: 0.9em; color: #777;">
            This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.
        </p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <p style="font-size: 0.8em; color: #aaa; text-align: center;">
            If you did not create an account, no further action is required.
        </p>

    </div>
    `;
};

module.exports = verifyEmail;
