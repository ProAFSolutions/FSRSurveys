using FSRSurveys.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FSRSurveys.API.Service
{

    public interface ISurveyService {

        void SaveSurvey(UserInfo userInfo);

        List<Category> GetCategories();

        List<Market> GetMarkets();

        UserInfo GetUserInfo(string userEmail);

        List<ManagerInfo> GetManagersData();

        List<AdminInfo> GetAdminsData();

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

        public List<ManagerInfo> GetManagersData()
        {
            List<ManagerInfo> result = null;
            using (var UoW = new SurveyDbContext())
            {
                UoW.Configuration.LazyLoadingEnabled = true;
                result = UoW.UserInfo.OfType<ManagerInfo>().ToList();
            }

            return result;
        }

        public List<AdminInfo> GetAdminsData()
        {
            List<AdminInfo> result = null;
            using (var UoW = new SurveyDbContext())
            {
                UoW.Configuration.LazyLoadingEnabled = true;
                result = UoW.UserInfo.OfType<AdminInfo>().ToList();
            }

            return result;
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

        public void SaveSurvey(UserInfo userInfo)
        {
            if (userInfo != null)
            {
                using (var UoW = new SurveyDbContext())
                {
                    UoW.Configuration.LazyLoadingEnabled = true;
                    UserInfo dbUser = null;
                    if (userInfo is ManagerInfo)
                        dbUser = UoW.UserInfo.OfType<ManagerInfo>().SingleOrDefault(U => U.Email.ToLower().Equals(userInfo.Email.ToLower()));
                    else
                        dbUser = UoW.UserInfo.OfType<AdminInfo>().SingleOrDefault(U => U.Email.ToLower().Equals(userInfo.Email.ToLower()));

                    if (dbUser == null)
                    {
                        var categories = UoW.Category.ToList();
                        foreach (var SA in userInfo.SurveyAnswers) {
                            if (SA.Category.Id > 0) {
                                var categ = categories.SingleOrDefault(C => C.Id == SA.Category.Id);
                                SA.Category = categ;
                                UoW.Entry(SA.Category).State = EntityState.Unchanged;
                            }
                            else {
                                SA.Category.DefinedByUser = userInfo.Email;
                                UoW.Category.Add(SA.Category);
                            }                          
                        }

                        UoW.UserInfo.Add(userInfo);                                        
                    }
                    else {
                        dbUser.Name = userInfo.Name;                       
                        dbUser.MarketName = userInfo.MarketName;
                        dbUser.PropertyName = userInfo.PropertyName;
                        dbUser.PropertyType = userInfo.PropertyType;
                        dbUser.UnitsTotal = userInfo.UnitsTotal;
                        dbUser.AssociationsNumber = userInfo.AssociationsNumber;
                        dbUser.PropertiesTotal = userInfo.PropertiesTotal;

                        if (dbUser is ManagerInfo)
                        {
                            ((ManagerInfo)dbUser).RdSupervisorName = ((ManagerInfo)userInfo).RdSupervisorName;
                            ((ManagerInfo)dbUser).VpSupervisorName = ((ManagerInfo)userInfo).VpSupervisorName;
                            ((ManagerInfo)dbUser).TotalBoardMeetingsHeldPerYear = ((ManagerInfo)userInfo).TotalBoardMeetingsHeldPerYear;
                        }
                        else {
                            ((AdminInfo)dbUser).ManagersNumber = ((AdminInfo)userInfo).ManagersNumber;
                        }

                        for (int index = 0; index < dbUser.SurveyAnswers.Count; index++)
                        {
                            var DbSA = dbUser.SurveyAnswers.ElementAt(index);
                            var SA = userInfo.SurveyAnswers.ElementAt(index);                            

                            DbSA.TimeEffort = SA.TimeEffort;
                            DbSA.ActivityOwner = SA.ActivityOwner;
                            DbSA.ActivityPerformed = SA.ActivityPerformed;
                            DbSA.Technology = SA.Technology;
                            DbSA.Date = SA.Date;

                            if (DbSA.Category.Name.Equals("Other"))
                            {
                                DbSA.Category.JobActivity = SA.Category.JobActivity;
                                UoW.Entry(DbSA.Category).State = EntityState.Modified;
                            }
                        }
                    }

                    UoW.SaveChanges();
                }
            }
        }
    }
}