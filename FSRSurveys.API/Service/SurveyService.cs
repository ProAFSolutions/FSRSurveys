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

    }
 
    public class SurveyService : ISurveyService
    {
        public List<Category> GetCategories()
        {
            List<Category> result = null;
            using (var UoW = new SurveyDbContext())
            {
                result =  UoW.Category.ToList();
            }
            return result;
        }

        public void SaveSurvey(UserInfo userInfo, List<Category> categories)
        {           

            using (var UoW = new SurveyDbContext())
            {

            }
        }
    }
}