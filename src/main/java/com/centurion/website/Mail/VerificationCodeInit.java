package com.centurion.website.Mail;


public class VerificationCodeInit {
    public static String getVerificationCode(int length){
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < length;i++){
            int mod = (int)(Math.random() * 3);
            switch (mod) {
                case 0: {
                    res.append((char)(48 + (int)(Math.random() * 10)));
                    break;
                }
                case 1: {
                    res.append((char)(97 + (int)(Math.random() * 26)));
                    break;
                }
                case 2: {
                    res.append((char)(65 + (int)(Math.random() * 26)));
                    break;
                }
                default:{
                    break;
                }
            }
        }
        return res.toString();
    }
}
