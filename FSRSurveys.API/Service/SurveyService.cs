using FSRSurveys.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSRSurveys.API.Service
{

    public interface ISurveyService {

        void SaveSurvey(UserInfo userInfo, List<Category> categories);

        List<Category> GetCategories();

        List<Market> GetMarkets();

        UserInfo GetUserInfo(string userEmail);

        bool CheckIfUserExists(string userEmail);
    }
 
    public class SurveyService : ISurveyService
    {
        public bool CheckIfUserExists(string userEmail)
        {
            UserInfo user = null;
            using (var UoW = new SurveyDbContext())
            {
                user = UoW.UserInfo.SingleOrDefault(U => U.Email.ToLower().Equals(userEmail.ToLower()));
            }

            return user != null;
        }

        public List<Category> GetCategories()
        {
            List<Category> result = null;
            using (var UoW = new SurveyDbContext())
            {
                result =  UoW.Category.ToList();
            }
            return result;
        }


        public List<Market> GetMarkets()
        {
            List<Market> result = null;
            using (var UoW = new MarketDbContext())
            {
                result = UoW.Market.Where(M => !M.isDebug).ToList();
            }
            return result;
        }

        public UserInfo GetUserInfo(string userEmail)
        {
            UserInfo result = null;
            using (var UoW = new SurveyDbContext())
            {
                UoW.Configuration.LazyLoadingEnabled = true;
                result = UoW.UserInfo.SingleOrDefault(U => U.Email.ToLower().Equals(userEmail.ToLower()));                
            }

            return result;
        }

        public void SaveSurvey(UserInfo userInfo, List<Category> categories)
        {
            
        }
    }
}