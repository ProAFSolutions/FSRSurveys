using FSRSurveys.API.Json;
using FSRSurveys.API.Models;
using FSRSurveys.API.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;



namespace FSRSurveys.API.Controllers
{
    [RoutePrefix("api/survey")]
    public class SurveyAPIController : ApiController
    {

        private ISurveyService _surveyService = new SurveyService();


        [HttpGet]
        [Route("categories")]
        public IHttpActionResult RequestCategories()
        {
            var result = _surveyService.GetCategories().Select(C => new
            {
                id = C.Id,
                name = C.Name,
                jobActivity = C.JobActivity
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("markets")]
        public IHttpActionResult RequestMarkets()
        {
            var result = _surveyService.GetMarkets().Select(M => new
            {
                name = M.marketName
            });

            return Ok(result);
        }

        [HttpGet]
        [Route("user-info")]
        public IHttpActionResult RequestUserInfo(string email)
        {
            var userData = _surveyService.GetUserInfo(email);

            if (userData != null)
            {
                UserInfoJson userInfo = null;

                if (userData is ManagerInfo)
                {
                    userInfo = new ManagerInfoJson
                    {
                        rdSupervisorName = (userData as ManagerInfo).RdSupervisorName,
                        vpSupervisorName = (userData as ManagerInfo).VpSupervisorName
                    };
                }
                else {
                    userInfo = new AdminInfoJson
                    {
                        managersNumber = (userData as AdminInfo).ManagersNumber                        
                    };
                }

                userInfo.name = userData.Name;
                userInfo.email = userData.Email;
                userInfo.marketName = userData.MarketName;
                userInfo.propertyName = userData.PropertyName;
                userInfo.propertyType = userData.PropertyType;
                userInfo.unitsTotal = userData.UnitsTotal;
                userInfo.associationsNumber = userData.AssociationsNumber;

                var questionnaireData = new QuestionnaireDataJson
                {
                    userInfo = userInfo,
                    items = userData.SurveyAnswers.Select(A => new QuestionnaireItemJson
                    {
                        category = new CategoryJson {
                            id = A.Category.Id,
                            name = A.Category.Name,
                            jobActivity = A.Category.JobActivity
                        },

                        answer = new AnswerJson {
                            timeEffort = (int) A.TimeEffort,
                            activityOwner = A.ActivityOwner,
                            activityPerformed = A.ActivityPerformed,
                            technology = A.Technology 
                        }

                    }).ToList()
                };

                return Ok(new { data = questionnaireData });
            }

            return Ok("error");
        }

        [HttpOptions, HttpPost]
        [Route("save")]
        public IHttpActionResult Save(QuestionnaireDataJson data)
        {
            if (data.userInfo != null && string.IsNullOrEmpty(data.userInfo.email))
            {
                UserInfo userInfo;
                if (data.userInfo is ManagerInfoJson)
                {
                    userInfo = new ManagerInfo
                    {
                        RdSupervisorName = (data.userInfo as ManagerInfoJson).rdSupervisorName,
                        VpSupervisorName = (data.userInfo as ManagerInfoJson).vpSupervisorName
                    };
                }
                else {
                    userInfo = new AdminInfo
                    {
                        ManagersNumber = (data.userInfo as AdminInfoJson).managersNumber                        
                    };
                }

                userInfo.Email = data.userInfo.email;
                userInfo.Name = data.userInfo.name;
                userInfo.MarketName = data.userInfo.marketName;
                userInfo.PropertyName = data.userInfo.propertyName;
                userInfo.PropertyType = data.userInfo.propertyType;
                userInfo.AssociationsNumber = data.userInfo.associationsNumber;
                userInfo.UnitsTotal = data.userInfo.unitsTotal;

                data.items.ForEach(I => {
                    userInfo.SurveyAnswers.Add(new SurveyAnswer
                    {
                        Date = DateTime.Now,
                        TimeEffort = I.answer.timeEffort,
                        ActivityOwner = I.answer.activityOwner,
                        ActivityPerformed = I.answer.activityPerformed,
                        Technology = I.answer.technology,                        
                        Category_Id = I.category.id
                    });
                });

                _surveyService.SaveSurvey(userInfo);

                return Ok("success");
            }

            return Ok("OK");
        }       
    }
}
