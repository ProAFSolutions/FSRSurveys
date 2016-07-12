using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSRSurveys.API.Json
{
    public class UserInfoJson
    {
        public string name { get; set; }       
        public string email { get; set; }
        public string propertyType { get; set; }
        public string propertyName { get; set; }
        public int associationsNumber { get; set; }
        public int unitsTotal { get; set; }
        public string marketName { get; set; }
    }

    public class ManagerInfoJson : UserInfoJson
    {
        public string rdSupervisorName { get; set; }
        public string vpSupervisorName { get; set; }
    }

    public class AdminInfoJson : UserInfoJson
    {       
        public int managersNumber { get; set; }
    }

}