using FSRSurveys.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSRSurveys.API.Json
{
    public abstract class UserInfoJson
    {
        public string name { get; set; }
        public string email { get; set; }
        public string propertyType { get; set; }
        public string propertyName { get; set; }
        public int associationsNumber { get; set; }
        public int unitsTotal { get; set; }
        public string marketName { get; set; }
        public int propertiesTotal { get; set; }

    }

    public class ManagerInfoJson : UserInfoJson
    {
        public string rdSupervisorName { get; set; }
        public string vpSupervisorName { get; set; }

        public ManagerInfo ToManagerInfo()
        {
            return new ManagerInfo
            {
                Email = email,
                Name = name,
                MarketName = marketName,
                PropertyName = propertyName,
                PropertyType = propertyType,
                AssociationsNumber = associationsNumber,
                UnitsTotal = unitsTotal,
                PropertiesTotal = propertiesTotal,
                RdSupervisorName = rdSupervisorName,
                VpSupervisorName = vpSupervisorName,
                TotalBoardMeetingsHeldPerYear = propertiesTotal
            };
        }
    }

    public class AdminInfoJson : UserInfoJson
    {
        public int managersNumber { get; set; }

        public AdminInfo ToAdminInfo()
        {
            return new AdminInfo
            {
                Email = email,
                Name = name,
                MarketName = marketName,
                PropertyName = propertyName,
                PropertyType = propertyType,
                AssociationsNumber = associationsNumber,
                UnitsTotal = unitsTotal,
                PropertiesTotal = propertiesTotal,
                ManagersNumber = managersNumber
            };
        }
    }


}