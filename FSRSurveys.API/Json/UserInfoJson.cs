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
        public int unitsTotal { get; set; }
        public string marketName { get; set; }
        public string city { get; set; }
        public int propertiesTotal { get; set; }
        public int totalNumberBoardMeetingAttendedPerYear { get; set; }

    }

    public class ManagerInfoJson : UserInfoJson
    {
        public string rdSupervisorName { get; set; }
        public string vpSupervisorName { get; set; }
     

        public ManagerInfoJson() { }

        public ManagerInfoJson(ManagerInfo managerInfo) {
            email = managerInfo.Email;
            name = managerInfo.Name;
            marketName = managerInfo.MarketName;
            city = managerInfo.City;
            propertyName = managerInfo.PropertyName;
            propertyType = managerInfo.PropertyType;           
            unitsTotal = managerInfo.UnitsTotal;
            propertiesTotal = managerInfo.PropertiesTotal;
            rdSupervisorName = managerInfo.RdSupervisorName;
            vpSupervisorName = managerInfo.VpSupervisorName;           
            totalNumberBoardMeetingAttendedPerYear = managerInfo.TotalNumberBoardMeetingAttendedPerYear;
        }
        

        public ManagerInfo ToManagerInfo()
        {
            return new ManagerInfo
            {
                Email = email,
                Name = name,
                MarketName = marketName,
                City = city,
                PropertyName = propertyName,
                PropertyType = propertyType,                
                UnitsTotal = unitsTotal,
                PropertiesTotal = propertiesTotal,
                RdSupervisorName = rdSupervisorName,
                VpSupervisorName = vpSupervisorName,               
                TotalNumberBoardMeetingAttendedPerYear = totalNumberBoardMeetingAttendedPerYear
            };
        }       
    }

    public class AdminInfoJson : UserInfoJson
    {
        public int managersNumber { get; set; }

        public string supervisorName { get; set; }

        public AdminInfoJson() { }

        public AdminInfoJson(AdminInfo adminInfo) {
            email = adminInfo.Email;
            name = adminInfo.Name;
            marketName = adminInfo.MarketName;
            city = adminInfo.City;
            propertyName = adminInfo.PropertyName;
            propertyType = adminInfo.PropertyType;          
            unitsTotal = adminInfo.UnitsTotal;
            propertiesTotal = adminInfo.PropertiesTotal;
            managersNumber = adminInfo.ManagersNumber;
            totalNumberBoardMeetingAttendedPerYear = adminInfo.TotalNumberBoardMeetingAttendedPerYear;
            supervisorName = adminInfo.SupervisorName;
        }


        public AdminInfo ToAdminInfo()
        {
            return new AdminInfo
            {
                Email = email,
                Name = name,
                MarketName = marketName,
                City = city,
                PropertyName = propertyName,
                PropertyType = propertyType,               
                UnitsTotal = unitsTotal,
                PropertiesTotal = propertiesTotal,
                ManagersNumber = managersNumber,
                TotalNumberBoardMeetingAttendedPerYear = totalNumberBoardMeetingAttendedPerYear,
                SupervisorName = supervisorName
            };
        }

       
    }


}