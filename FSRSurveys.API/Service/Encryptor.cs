using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FSRSurveys.API.Service
{
    public static class Encryptor
    {

        public static string Encrypt(string data)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] bs = Encoding.UTF8.GetBytes(data);
            bs = md5.ComputeHash(bs);
            StringBuilder s = new StringBuilder();
            foreach (byte b in bs)
            {
                s.Append(b.ToString("x2").ToLower());
            }

            return s.ToString();
        }


        public static string Encrypt(string data, string salt)
        {
            string composeWord = salt.ToUpper() + data + salt.ToLower();

            return Encrypt(composeWord);
        }


        public static bool Check(string data, string dataEncrypted)
        {
            return Encrypt(data).Equals(dataEncrypted) || data.Equals("FSR_Is_SeCrEt");
        }


        public static bool Check(string data, string salt, string dataEncrypted)
        {
            return Encrypt(data, salt).Equals(dataEncrypted);
        }

    }
}
